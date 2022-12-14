/**
 * Copyright (c) Stanislav Shishankin
 *
 * This source code is licensed under the MIT license.
 */

import {
  IReactiveEvent,
  IReactiveValue,
  zzReactive,
  zzReactiveGetObserver,
} from "./Reactive";
import { DestructorsStack, IDestructor } from "../Destructor";
import { zzEvent, EventsObserver, onStartListening } from "../Event";
import { ValueChangeEvent } from "./Reactive";
import { zzMakeReactive, ValueOrReactive } from "./helpers";
import { zzCompute, zzComputeFn } from "./compute";
import { zzInteger } from "./vars";

export class ArrayAddEvent<T> {
  constructor(
    public readonly added: T,
    public readonly index: number,
    public readonly target: zzArrayInstance<T>
  ) {}
}

export class ArrayRemoveEvent<T> {
  constructor(
    public readonly removed: T,
    public readonly index: number,
    public readonly target: zzArrayInstance<T>
  ) {}
}

export interface IArrayEvent<T> extends IReactiveEvent<T[]> {
  readonly onAdd: zzEvent<(event: ArrayAddEvent<T>) => void>;
  readonly onRemove: zzEvent<(event: ArrayRemoveEvent<T>) => void>;
}

export interface IArrayMethods<T> extends IReactiveValue<T[]> {
  readonly length: number;

  add(elements: T[], index?: number): this;
  addBefore(elements: T[], before: T): this;
  addAfter(elements: T[], after: T): this;

  remove(elements: T[]): this;
  removeByIndex(index: number): this;
  removeAll(): this;

  has(element: T): boolean;
  replace(newElements: T[]): this;

  toArray(): T[];
}

export interface IArrayHelpers<T> {
  setItemsListener(
    addFn: (item: T, array: this) => IDestructor | void,
    removeFn: (item: T, array: this) => void
  ): IDestructor;

  filter(
    filterFn: (value: T, index: number, array: this) => boolean,
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ): zzArrayInstance<T>;

  includes(value: T | zzReactive<T>): zzReactive<boolean>;

  find(
    findFn: (value: T, index: number, array: this) => boolean,
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ): zzReactive<T | undefined>;

  sort(
    sortFn: (a: T, b: T) => number,
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ): zzArrayInstance<T>;

  join(join: ValueOrReactive<string>): zzReactive<string>;

  map<NewT>(
    mapFn: (value: T, index: zzInteger, self: zzArrayInstance<T>) => NewT,
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ): zzArrayInstance<NewT>;
}

export type IArray<T> = IArrayEvent<T> & IArrayMethods<T>;

export class zzArrayInstance<T>
  extends zzReactive<T[]>
  implements IArrayEvent<T>, IArrayHelpers<T>
{
  static zzInstance = Symbol.for(this.name);

  readonly onAdd = new zzEvent<(event: ArrayAddEvent<T>) => void>();
  readonly onRemove = new zzEvent<(event: ArrayRemoveEvent<T>) => void>();

  *[Symbol.iterator]() {
    for (let el of this.toArray()) {
      yield el;
    }
  }

  toArray() {
    zzReactiveGetObserver.emit(this);

    return this._value;
  }

  get length() {
    return this.toArray().length;
  }

  get value() {
    return this.toArray();
  }

  /* helpers */
  setItemsListener(
    addFn: (item: T, array: this) => IDestructor | void,
    removeFn: (item: T, array: this) => void = () => {}
  ) {
    const destructionMap = new Map<T, IDestructor>();

    const addEvent = this.onAdd.addListener((ev) => {
      const toDestroy = addFn.call(this, ev.added, this);
      if (toDestroy) {
        destructionMap.set(ev.added, toDestroy);
      }
    });

    const removeEvent = this.onRemove.addListener((ev) => {
      const toDestroy = destructionMap.get(ev.removed);
      if (toDestroy) {
        toDestroy.destroy();
        destructionMap.delete(ev.removed);
      }
      removeFn.call(this, ev.removed, this);
    });

    const destructor = new DestructorsStack(addEvent, removeEvent);

    this.toArray().forEach((element, index) =>
      addEvent.run(new ArrayAddEvent(element, index, this))
    );

    destructor.addFn(() => {
      this.toArray().forEach((element) =>
        removeEvent.run(new ArrayRemoveEvent(element, 0, this))
      );
    });

    return destructor;
  }

  filter(
    filterFn: (value: T, index: number, array: this) => boolean,
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ) {
    return new zzComputeArrayFn(
      () =>
        this.toArray().filter((value, index) => filterFn(value, index, this)),
      ...dependencies
    );
  }

  includes(value: T | zzReactive<T>) {
    if (value instanceof zzReactive) {
      return zzCompute(() => this.toArray().includes(value.value));
    }

    return zzCompute(() => this.toArray().includes(value));
  }

  find(
    findFn: (value: T, index: number, array: this) => boolean,
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ) {
    return zzCompute(
      () => this.toArray().find((value, index) => findFn(value, index, this)),
      ...dependencies
    );
  }

  sort(
    sortFn: (a: T, b: T) => number,
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ) {
    return new zzComputeArrayFn(
      () => this.toArray().slice().sort(sortFn),
      ...dependencies
    );
  }

  join(join: ValueOrReactive<string> = "") {
    const joinReact = zzMakeReactive(join);

    const joinedString = zzCompute(() => this.value.join(joinReact.value));

    return joinedString;
  }

  map<NewT>(
    mapFn: (value: T, index: zzInteger, self: zzArrayInstance<T>) => NewT,
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ) {
    return new zzArrayMap<T, NewT>(this, mapFn, dependencies);
  }
}

export class zzArray<T> extends zzArrayInstance<T> implements IArray<T> {
  static zzInstance = Symbol.for(this.name);

  add(elements: T[], index?: number) {
    index === undefined && (index = this._value.length);

    this._value.splice(index, 0, ...elements);

    for (let i = 0; i < elements.length; i++) {
      this.onAdd.emit(new ArrayAddEvent(elements[i], index + i, this));
    }
    this.onChange.emit(new ValueChangeEvent(this._value, this._value, this));

    return this;
  }

  addBefore(elements: T[], before: T) {
    let idx = this._value.indexOf(before);
    if (idx === -1) {
      return this;
    }

    return this.add(elements, idx);
  }

  addAfter(elements: T[], after: T) {
    let idx = this._value.indexOf(after);
    if (idx === -1) {
      return this;
    }

    return this.add(elements, idx + 1);
  }

  removeAll() {
    const last = this._value;

    this._value = [];

    for (let k = 0; k < last.length; k++) {
      this.onRemove.emit(new ArrayRemoveEvent(last[k], 0, this));
    }
    this.onChange.emit(new ValueChangeEvent(this._value, this._value, this));

    return this;
  }

  remove(elements: T[]) {
    for (let d of elements) {
      let idx = this._value.indexOf(d);
      if (idx !== -1) {
        const removed = this._value.splice(idx, 1);
        this.onRemove.emit(new ArrayRemoveEvent(removed[0], idx, this));
      }
    }

    this.onChange.emit(new ValueChangeEvent(this._value, this._value, this));

    return this;
  }

  removeByIndex(index: number) {
    if (typeof this._value[index] !== "undefined") {
      const removed = this._value.splice(index, 1);
      this.onRemove.emit(new ArrayRemoveEvent(removed[0], index, this));
      this.onChange.emit(new ValueChangeEvent(this._value, this._value, this));
    }

    return this;
  }

  has(element: T) {
    return this._value.includes(element);
  }

  protected _silentReplace(newElements: T[]) {
    let currentIndex = 0;
    let deletedItems = 0;
    const array = this._value;
    this._value = newElements.slice();

    for (let i = 0; i < newElements.length; i++) {
      //follow new array and find it in old array
      const index = array.indexOf(newElements[i], currentIndex);
      if (index !== -1) {
        for (let k = currentIndex; k < index; k++) {
          this.onRemove.emit(
            new ArrayRemoveEvent(array[k], currentIndex - deletedItems, this)
          );
        }

        deletedItems += index - currentIndex;
        currentIndex = index + 1;
      }
    }

    //remove all last elements
    for (let k = currentIndex; k < array.length; k++) {
      this.onRemove.emit(
        new ArrayRemoveEvent(array[k], currentIndex - deletedItems, this)
      );
    }

    //add new elements
    currentIndex = 0;
    for (let i = 0; i < newElements.length; i++) {
      //follow new array and find it in old array
      const index = array.indexOf(newElements[i], currentIndex);
      if (index === -1) {
        this.onAdd.emit(new ArrayAddEvent(newElements[i], i, this));
      } else {
        currentIndex = index + 1;
      }
    }
  }

  replace(newElements: T[]) {
    this._silentReplace(newElements);

    this.onChange.emit(new ValueChangeEvent(this._value, this._value, this));

    return this;
  }

  refresh() {
    this.onChange.emit(new ValueChangeEvent(this._value, this._value, this));

    return this;
  }

  toArray() {
    zzReactiveGetObserver.emit(this);

    return this._value;
  }

  get value() {
    return this.toArray();
  }

  set value(newElements: T[]) {
    this.replace(newElements);
  }

  constructor(array: T[] = []) {
    super(array.slice());
  }
}

export class zzComputeArrayFn<T> extends zzArrayInstance<T> {
  static zzInstance = Symbol.for(this.name);

  readonly sourceArray: zzComputeFn<Array<T>>;
  protected eventObserver;

  get value() {
    return this.toArray();
  }

  private set value(newElements: T[]) {
    throw new SyntaxError("You can not set compute array value");
  }

  toArray() {
    zzReactiveGetObserver.emit(this);

    if (this.eventObserver.isWatching) {
      return this._value;
    }

    return this.sourceArray.value;
  }

  protected _silentReplace(newElements: T[]) {
    let currentIndex = 0;
    let deletedItems = 0;
    const array = this._value;
    this._value = newElements.slice();

    for (let i = 0; i < newElements.length; i++) {
      //follow new array and find it in old array
      const index = array.indexOf(newElements[i], currentIndex);
      if (index !== -1) {
        for (let k = currentIndex; k < index; k++) {
          this.onRemove.emit(
            new ArrayRemoveEvent(array[k], currentIndex - deletedItems, this)
          );
        }

        deletedItems += index - currentIndex;
        currentIndex = index + 1;
      }
    }

    //remove all last elements
    for (let k = currentIndex; k < array.length; k++) {
      this.onRemove.emit(
        new ArrayRemoveEvent(array[k], currentIndex - deletedItems, this)
      );
    }

    //add new elements
    currentIndex = 0;
    for (let i = 0; i < newElements.length; i++) {
      //follow new array and find it in old array
      const index = array.indexOf(newElements[i], currentIndex);
      if (index === -1) {
        this.onAdd.emit(new ArrayAddEvent(newElements[i], i, this));
      } else {
        currentIndex = index + 1;
      }
    }
  }

  protected replace(newElements: T[]) {
    this._silentReplace(newElements);

    this.onChange.emit(new ValueChangeEvent(this._value, this._value, this));

    return this;
  }

  constructor(
    fn: () => T[],
    ...dependencies: (zzReactive<any> | zzEvent<any>)[]
  ) {
    super([]);

    this.eventObserver = onStartListening(
      () => {
        this._value = this.sourceArray.value;
        return this.sourceArray.onChange.addListener(() => {
          this.replace(this.sourceArray.value);
        });
      },
      this.onAdd,
      this.onChange,
      this.onRemove
    );

    this.sourceArray = new zzComputeFn(fn, ...dependencies);
  }
}

export class zzArrayMap<T, NewT> extends zzArrayInstance<NewT> {
  static zzInstance = Symbol.for(this.name);

  readonly mappedArray: zzArray<T>;
  readonly sourceArray: zzArrayInstance<T>;
  readonly mapFn: (value: T, index: zzInteger, self: zzArray<T>) => NewT;
  protected readonly indexMap = new Map<T, zzInteger>();
  protected readonly eventObserver: EventsObserver;

  protected _isSilent = false;

  protected add(elements: NewT[], index?: number) {
    index === undefined && (index = this._value.length);

    this._value.splice(index, 0, ...elements);

    if (this._isSilent) return this;

    for (let i = 0; i < elements.length; i++) {
      this.onAdd.emit(new ArrayAddEvent(elements[i], index + i, this));
    }

    return this;
  }

  protected removeByIndex(index: number) {
    if (typeof this._value[index] !== "undefined") {
      const removed = this._value.splice(index, 1);

      if (this._isSilent) return this;

      this.onRemove.emit(new ArrayRemoveEvent(removed[0], index, this));
    }

    return this;
  }

  get value() {
    return this.toArray();
  }

  private set value(newElements: NewT[]) {
    throw new SyntaxError("You can not set mapped array value");
  }

  toArray() {
    zzReactiveGetObserver.emit(this);

    if (!this.eventObserver.isWatching) {
      this.refresh();
    }

    return this._value;
  }

  protected refreshIndexes() {
    let index = 0;
    for (let element of this.mappedArray) {
      const reactiveIndex = this.indexMap.get(element);
      if (reactiveIndex) reactiveIndex.value = index++;
    }
  }

  refresh() {
    this.mappedArray.replace(this.sourceArray.toArray());
    this.refreshIndexes();

    return this;
  }

  constructor(
    sourceArray: zzArrayInstance<T>,
    mapFn: (value: T, index: zzInteger, self: zzArrayInstance<T>) => NewT,
    dependencies: (zzReactive<any> | zzEvent<any>)[]
  ) {
    super([]);

    this.sourceArray = sourceArray;
    this.mappedArray = new zzArray<T>([]);
    this.mapFn = mapFn;

    this.mappedArray.onAdd.addListener((ev) => {
      const newIndex = new zzInteger(ev.index);

      const newValue = mapFn(ev.added, newIndex, this.sourceArray);

      this.indexMap.set(ev.added, newIndex);

      this.add([newValue], ev.index);
    });

    this.mappedArray.onRemove.addListener((ev) => {
      this.indexMap.delete(ev.removed);

      this.removeByIndex(ev.index);
    });

    this.mappedArray.onChange.addListener(() => {
      this.refreshIndexes();
    });

    this.eventObserver = onStartListening(
      () => {
        //make silent values initialization, if listeners are added partly
        this._isSilent = true;
        this.refresh();
        this._isSilent = false;

        const eventsStack = new DestructorsStack(
          sourceArray.onChange.addListener((ev) => {
            this.refreshIndexes();
            this.onChange.emit(
              new ValueChangeEvent(this._value, this._value, this)
            );
          }),
          sourceArray.onAdd.addListener((ev) => {
            this.mappedArray.add([ev.added], ev.index);
          }),
          sourceArray.onRemove.addListener((ev) => {
            this.mappedArray.removeByIndex(ev.index);
          })
        );

        for (let varOrEvent of dependencies) {
          if (varOrEvent instanceof zzEvent) {
            eventsStack.add(
              varOrEvent.addListener(() => {
                this.mappedArray.removeAll();
                this.refresh();
                this.onChange.emit(
                  new ValueChangeEvent(this._value, this._value, this)
                );
              })
            );
          } else if (varOrEvent.onChange instanceof zzEvent) {
            eventsStack.add(
              varOrEvent.onChange.addListener(() => {
                this.mappedArray.removeAll();
                this.refresh();
                this.onChange.emit(
                  new ValueChangeEvent(this._value, this._value, this)
                );
              })
            );
          }
        }

        return eventsStack;
      },
      this.onAdd,
      this.onChange,
      this.onRemove
    );
  }
}

// /**
//  * experemental
//  */
// export class zzArrayModel<
//   NewT extends zzReactive<any>,
//   T = InferReactive<NewT>
// > extends zzArrayInstance<T> {
//  static zzInstance = Symbol.for(this.name);

//   readonly model: zzArray<NewT>;

//   get value(): T[] {
//     zzReactiveGetObserver.emit(this);

//     return this.model.toArray().map((model) => model.value);
//   }

//   set value(array: T[]) {
//     this.update(array);
//   }

//   update(array: T[]) {
//     this.replace(array);
//   }

//   constructor(
//     modelContructorFn: (value: T, index: number) => NewT,
//     modelUpdateFn: (model: NewT, value: T) => void = (model, value) =>
//       (model.value = value)
//   ) {
//     super([]);

//     this.model = new zzComputeArrayFn(() =>
//       this.toArray().map((value, index) => {
//         const model = modelContructorFn(value, index);
//         modelUpdateFn(model, value);
//         return model;
//       })
//     );
//   }
// }
