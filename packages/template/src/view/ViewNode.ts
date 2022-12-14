/**
 * Copyright (c) Stanislav Shishankin
 *
 * This source code is licensed under the MIT license.
 */

import {
  DestructorsStack,
  IDestructor,
  ValueChangeEvent,
  zzArrayInstance,
} from "@lizzi/core";
import { JSX } from "@lizzi/jsx-runtime";
import { zzObject, zzReactive } from "@lizzi/core";
import { zzSimpleEvent } from "@lizzi/core";

type ViewComponentStatuses = "unmounted" | "mounted" | "in-unmount-process";

// let unmountTimer: NodeJS.Timeout | null = null;
// let unmountMap = new Map<ViewNode, () => void>();
// const deferUnmount = (view: ViewNode, fn: () => void) => {
//   unmountMap.set(view, fn);

//   if (!unmountTimer) {
//     unmountTimer = setTimeout(() => {
//       unmountMap.forEach((fn) => fn());
//       unmountMap.clear();
//       unmountTimer = null;
//     }, 0);
//   }
// };
// const unsetUnmount = (view: ViewNode) => {
//   unmountMap.delete(view);
// };

export const isViewNodeConstructor = Symbol.for("ViewNode");

export interface IViewNode {
  parentNode: ViewNode | null;
  mount(): void;
  unmount(): void;
}

export interface IViewNodeNodes {}

export class ViewNode implements IViewNode {
  static [isViewNodeConstructor] = true;

  readonly _onMount = new zzSimpleEvent<
    <T extends ViewNode>(view: T) => void
  >();
  protected readonly _unmountStack = new DestructorsStack();

  parentNode: ViewNode | null = null;
  readonly childNodes: ViewNode[] = [];

  protected _viewState: ViewComponentStatuses = "unmounted";
  protected _elements: Node[] = [];

  protected _appendElement(view: ViewNode, beforeViewNode: ViewNode | null) {
    const nodes = view.getNodes();
    const lastElement = this._elements[0];
    const before = beforeViewNode ? beforeViewNode.getFirstNode() : lastElement;
    for (let node of nodes) {
      lastElement.parentNode?.insertBefore(node, before);
    }
  }

  appendChild(view: ViewNode) {
    if (view.parentNode !== null) {
      view.parentNode.removeNode(view);
    }

    view.parentNode = this;
    this.childNodes.push(view);

    this._appendElement(view, null);

    if (this._viewState === "mounted") {
      view.mount();
    }

    return this;
  }

  append(childrens?: JSX.Childrens) {
    if (Array.isArray(childrens)) {
      const viewNodes = childrens.map((child) =>
        JSXChildrenToNodeMapper(child)
      );

      for (let view of viewNodes) {
        if (view) {
          this.appendChild(view);
        }
      }
    } else if (childrens) {
      const view = JSXChildrenToNodeMapper(childrens);
      if (view) {
        this.appendChild(view);
      }
    }

    return this;
  }

  insertBefore(view: ViewNode, beforeView: ViewNode) {
    if (view.parentNode !== null) {
      view.parentNode.removeNode(view);
    }

    if (!beforeView) {
      return this.appendChild(view);
    }

    const indexBefore = this.childNodes.indexOf(beforeView);
    if (indexBefore !== -1) {
      view.parentNode = this;

      this.childNodes.splice(indexBefore, 0, view);

      this._appendElement(view, beforeView);

      if (this._viewState === "mounted") {
        view.mount();
      }
    }

    return this;
  }

  protected _removeElement(view: ViewNode) {
    const nodes = view.getNodes();
    for (let node of nodes) {
      node.parentNode?.removeChild(node);
    }
  }

  removeNode(view: ViewNode) {
    if (view.parentNode === this) {
      view.unmount();

      const indexElement = this.childNodes.indexOf(view);
      if (indexElement !== -1) {
        this.childNodes.splice(indexElement, 1);
        view.parentNode = null;

        this._removeElement(view);
      }
    }

    return this;
  }

  remove(viewNodes: ViewNode[]) {
    for (let view of viewNodes) {
      this.removeNode(view);
    }

    return this;
  }

  removeAllChilds() {
    const childs = this.childNodes.slice();
    for (let view of childs) {
      this.removeNode(view);
    }

    return this;
  }

  findParent<T extends ViewNode>(
    findFn: (view: ViewNode) => boolean
  ): T | null {
    for (let parent = this.parentNode; parent; parent = parent.parentNode) {
      if (findFn(parent)) {
        return parent as T;
      }
    }

    return null;
  }

  parentContext<T extends ViewNode>(findInstance: new (...args: any) => T) {
    const parentView = this.findParent<T>(
      (view) => view instanceof findInstance
    );

    if (!parentView)
      throw new Error(
        "Class " +
          this.constructor.name +
          " should have parent Node " +
          findInstance.name
      );

    return parentView;
  }

  zzParentContext<T extends ViewNode>(findInstance: new (...args: any) => T) {
    const parentContext = new zzObject<T>();

    this.onMount(() => {
      parentContext.value = this.parentContext(findInstance);

      this.onceUnmount(() => {
        parentContext.value = null;
      });
    });

    return parentContext;
  }

  *findChilds<T extends ViewNode>(
    findFn: (view: ViewNode) => boolean
  ): Generator<T> {
    for (let child of this.childNodes) {
      if (findFn(child)) {
        yield child as T;
      } else {
        yield* child.findChilds(findFn);
      }
    }
  }

  *findNodes<T extends ViewNode>(
    findInstance: new (...args: any) => T
  ): Generator<T> {
    yield* this.findChilds<T>((node) => node instanceof findInstance);
  }

  findChildNodes<T extends ViewNode>(
    findInstance: new (...args: any) => T
  ): T[] {
    return Array.from(
      this.findChilds<T>((node) => node instanceof findInstance)
    );
  }

  getNodes() {
    let elements: Node[] = [];

    for (let node of this.childNodes) {
      elements = elements.concat(node.getNodes());
    }

    return elements.concat(this._elements);
  }

  getFirstNode(): Node {
    return this.childNodes.length > 0
      ? this.childNodes[0].getFirstNode()
      : this._elements[0];
  }

  getFirstElement(): Element | undefined {
    for (const child of this.childNodes) {
      const childElement = child.getFirstElement();
      if (childElement) return childElement;
    }

    return this._elements.find((node) => node instanceof Element) as Element;
  }

  protected setNodes(elements: Node[]) {
    this._elements = elements;
  }

  mount() {
    if (this._viewState === "in-unmount-process") {
      console.trace(this, "unmount in progress, you should wait finish it");
      return;
    }

    if (this._viewState === "unmounted") {
      this._onMount.emit(this);

      this._viewState = "mounted";

      for (let view of this.childNodes.slice()) {
        view.mount();
      }
    }
  }

  unmount() {
    if (this._viewState === "mounted") {
      this._viewState = "in-unmount-process";

      for (let view of this.childNodes.slice()) {
        view.unmount();
      }

      this._unmountStack.destroy();

      this._viewState = "unmounted";
    }
  }

  onMount(fn: (view: this) => void) {
    this._onMount.addListener(fn as any);

    return this;
  }

  onceUnmount(fn: () => void) {
    this._unmountStack.addFn(fn);

    return this;
  }

  addToUnmount(...eventListeners: IDestructor[]) {
    this._unmountStack.add(...eventListeners);

    return this;
  }

  callChildrenFunc(childrens: JSX.FuncChildrens<this>) {
    return typeof childrens === "function" ? childrens(this) : childrens;
  }
}

export class TextView extends ViewNode {
  constructor({
    children,
  }: {
    children: string | number | boolean | zzReactive<any>;
  }) {
    super();

    if (children instanceof zzReactive) {
      const textElement = document.createTextNode("");
      this.setNodes([textElement]);

      this.onMount(() => {
        this.addToUnmount(
          children.onChange
            .addListener((ev) => {
              if (ev.last instanceof ViewNode) {
                this.removeNode(ev.last);
              } else {
                textElement.data = "";
              }

              if (ev.value instanceof ViewNode) {
                this.appendChild(ev.value);
              } else {
                textElement.data = ev.value;
              }
            })
            .run(ValueChangeEvent.run(children))
        );
      });
    } else {
      this.setNodes([document.createTextNode(String(children))]);
    }
  }
}

export class ArrayView<T extends ViewNode> extends ViewNode {
  constructor({ children }: { children: zzArrayInstance<T> | T[] }) {
    super();

    this.setNodes([document.createTextNode("")]);

    if (children instanceof zzArrayInstance) {
      this.onMount(() => {
        const mapArray: T[] = [];

        for (let view of children) {
          this.appendChild(view);

          mapArray.push(view);
        }

        this.addToUnmount(
          children.onAdd.addListener((ev) => {
            this.insertBefore(ev.added, mapArray[ev.index]);

            mapArray.splice(ev.index, 0, ev.added);
          }),
          children.onRemove.addListener((ev) => {
            this.removeNode(ev.removed);

            mapArray.splice(ev.index, 1);
          })
        );

        this.onceUnmount(() => {
          this.removeAllChilds();
        });
      });
    } else {
      this.append(children);
    }
  }
}

export class ObjectView<T extends ViewNode> extends ViewNode {
  constructor({ children }: { children: zzReactive<T | null> | T }) {
    super();

    this.setNodes([document.createTextNode("")]);

    if (children instanceof zzReactive) {
      this.onMount(() => {
        this.addToUnmount(
          children.onChange.addListener((ev) => {
            if (ev.last) {
              this.removeNode(ev.last);
            }

            if (ev.value) {
              this.appendChild(ev.value);
            }
          })
        );

        if (children.value) {
          this.appendChild(children.value);
        }

        this.onceUnmount(() => {
          this.removeAllChilds();
        });
      });
    } else {
      this.appendChild(children);
    }
  }
}

export const JSXChildrenToNodeMapper = (children: JSX.Children): ViewNode => {
  if (children instanceof zzArrayInstance || Array.isArray(children)) {
    return new ArrayView({ children });
  }

  if (children instanceof zzObject) {
    return new ObjectView({ children });
  }

  if (
    typeof children === "boolean" ||
    typeof children === "string" ||
    typeof children === "number" ||
    children instanceof zzReactive
  ) {
    return new TextView({ children });
  }

  if (typeof children === "function") {
    throw Error(
      "To pass function to children you have to use this.callChildrenFunc(children) inside the Component"
    );
  }

  return children;
};

export const MapJSXChildrensToNodes = (
  childrens: JSX.Childrens
): ViewNode[] => {
  if (Array.isArray(childrens)) {
    return childrens
      .map((child) => JSXChildrenToNodeMapper(child))
      .filter((view) => view);
  }

  return [JSXChildrenToNodeMapper(childrens)].filter((view) => view);
};
