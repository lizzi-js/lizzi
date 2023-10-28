/**
 * Copyright (c) Stanislav Shishankin
 *
 * This source code is licensed under the MIT license.
 */

import {
  DestructorsStack,
  IDestructor,
  zzDestructorsObserver,
} from "../../Destructor";
import {
  zzReactiveValueGetObserver,
  zzReadonly,
  IReadOnlyReactive,
  ReactiveEventChange,
} from "../reactive";

export interface IReactiveArrayEventAdd<TValue, TTarget> {
  added: TValue;
  index: number;
  target: TTarget;
}

export class ReactiveArrayEventAdd<TValue, TTarget> {
  constructor(
    public readonly added: TValue,
    public readonly index: number,
    public readonly target: TTarget
  ) {}
}

export interface IReactiveArrayEventRemove<TValue, TTarget> {
  removed: TValue;
  index: number;
  target: TTarget;
}

export class ReactiveArrayEventRemove<TValue, TTarget> {
  constructor(
    public readonly removed: TValue,
    public readonly index: number,
    public readonly target: TTarget
  ) {}
}

export interface IReadOnlyArray<T> extends IReadOnlyReactive<T[]> {
  readonly length: number;
  readonly onAdd: zzEvent<
    (event: ReactiveArrayEventAdd<T, IReadOnlyArray<T>>) => void
  >;
  readonly onRemove: zzEvent<
    (event: ReactiveArrayEventRemove<T, IReadOnlyArray<T>>) => void
  >;
  toArray(): T[];
  [Symbol.iterator](): IterableIterator<T>;

  itemsListener(
    addFn: (item: T, index: number, array: this) => void,
    removeFn: (item: T, index: number, array: this) => void
  ): this;

  has(item: T): IReadOnlyReactive<boolean>;

  filter(
    filterFn: (value: T, index: number, array: this) => boolean
  ): IReadOnlyArray<T>;

  includes(value: T | zzReadonly<T>): IReadOnlyReactive<boolean>;

  find(
    findFn: (value: T, index: number, array: this) => boolean,
    ...dependencies: (zzReadonly<any> | zzEvent<any>)[]
  ): zzReadonly<T | undefined>;

  sort(
    sortFn: (a: T, b: T) => number,
    ...dependencies: (zzReadonly<any> | zzEvent<any>)[]
  ): IReadOnlyArray<T>;

  join(join: zzReadonly<string>): zzReadonly<string>;

  map<NewT>(
    mapFn: (value: T, self: zzReadonlyArray<T>) => NewT
  ): IReadOnlyArray<NewT>;

  flat(): IReadOnlyArray<T>;

  indexes(): zzArrayIndex<T>;
}

export class zzReadonlyArray<T>
  extends zzReadonly<T[]>
  implements IReadOnlyArray<T>
{
  readonly onAdd = new zzEvent<
    (event: ReactiveArrayEventAdd<T, IReadOnlyArray<T>>) => void
  >();
  readonly onRemove = new zzEvent<
    (event: ReactiveArrayEventRemove<T, IReadOnlyArray<T>>) => void
  >();

  protected add(elements: T[], index?: number) {
    index === undefined && (index = this._value.length);

    // this._value.splice(index, 0, ...elements);
    safeInsertToArray(this._value, index, elements);

    for (let i = 0; i < elements.length; i++) {
      this.onAdd.emit(new ReactiveArrayEventAdd(elements[i], index + i, this));
    }
    this.onChange.emit(new ReactiveEventChange(this._value, this._value, this));

    return this;
  }

  protected addBefore(elements: T[], before: T) {
    let idx = this._value.indexOf(before);
    if (idx === -1) {
      return this;
    }

    return this.add(elements, idx);
  }

  protected addAfter(elements: T[], after: T) {
    let idx = this._value.indexOf(after);
    if (idx === -1) {
      return this;
    }

    return this.add(elements, idx + 1);
  }

  protected removeAll() {
    const last = this._value;

    this._value = [];

    for (let k = 0; k < last.length; k++) {
      this.onRemove.emit(new ReactiveArrayEventRemove(last[k], 0, this));
    }
    this.onChange.emit(new ReactiveEventChange(this._value, this._value, this));

    return this;
  }

  protected remove(elements: T[]) {
    for (let d of elements) {
      let idx = this._value.indexOf(d);
      if (idx !== -1) {
        const removed = this._value.splice(idx, 1);
        this.onRemove.emit(new ReactiveArrayEventRemove(removed[0], idx, this));
      }
    }

    this.onChange.emit(new ReactiveEventChange(this._value, this._value, this));

    return this;
  }

  protected removeByIndex(index: number) {
    const removed = this._value.splice(index, 1);

    if (removed.length > 0) {
      this.onRemove.emit(new ReactiveArrayEventRemove(removed[0], index, this));
      this.onChange.emit(
        new ReactiveEventChange(this._value, this._value, this)
      );
    }

    return this;
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
            new ReactiveArrayEventRemove(
              array[k],
              currentIndex - deletedItems,
              this
            )
          );
        }

        deletedItems += index - currentIndex;
        currentIndex = index + 1;
      }
    }

    //remove all last elements
    for (let k = currentIndex; k < array.length; k++) {
      this.onRemove.emit(
        new ReactiveArrayEventRemove(
          array[k],
          currentIndex - deletedItems,
          this
        )
      );
    }

    //add new elements
    currentIndex = 0;
    for (let i = 0; i < newElements.length; i++) {
      //follow new array and find it in old array
      const index = array.indexOf(newElements[i], currentIndex);
      if (index === -1) {
        this.onAdd.emit(new ReactiveArrayEventAdd(newElements[i], i, this));
      } else {
        currentIndex = index + 1;
      }
    }
  }

  protected replace(newElements: T[]) {
    this._silentReplace(newElements);

    this.onChange.emit(new ReactiveEventChange(this._value, this._value, this));

    return this;
  }

  static isArray(check: any): check is zzReadonlyArray<any> {
    return (
      check &&
      zzEvent.isEvent(check.onAdd) &&
      zzEvent.isEvent(check.onRemove) &&
      zzReadonly.isReactive(check)
    );
  }

  destroy(): void {
    super.destroy();
    this.onAdd.destroy();
    this.onRemove.destroy();
  }

  *[Symbol.iterator]() {
    for (let el of this.toArray()) {
      yield el;
    }
  }

  toArray() {
    zzReactiveValueGetObserver.add(this);

    return this._value;
  }

  get length() {
    return this.toArray().length;
  }

  get value() {
    return this.toArray();
  }

  /* helpers */
  indexes(): zzArrayIndex<T> {
    return new zzArrayIndex(this);
  }

  has(item: T) {
    return zzCompute(() => this.toArray().includes(item));
  }

  itemsListener(
    addFn: (item: T, index: number, array: this) => void,
    removeFn: (item: T, index: number, array: this) => void = () => {}
  ) {
    const destructionMap = new Map<T, IDestructor>();

    const addEvent = this.onAdd.addListener((ev) => {
      const toDestroy = zzDestructorsObserver.catch(() =>
        addFn.call(this, ev.added, ev.index, this)
      );

      if (toDestroy.size > 0) {
        destructionMap.set(ev.added, toDestroy);
      }
    });

    const removeEvent = this.onRemove.addListener((ev) => {
      const toDestroy = destructionMap.get(ev.removed);
      if (toDestroy) {
        toDestroy.destroy();
        destructionMap.delete(ev.removed);
      }
      removeFn.call(this, ev.removed, ev.index, this);
    });

    const destructor = new DestructorsStack(addEvent, removeEvent);

    this.toArray().forEach((element, index) =>
      addEvent.run(new ReactiveArrayEventAdd(element, index, this))
    );

    destructor.addFunc(() => {
      this.toArray().forEach((element) =>
        removeEvent.run(new ReactiveArrayEventRemove(element, 0, this))
      );
    });

    return this;
  }

  filter(filterFn: (value: T, index: number, array: this) => boolean) {
    return new zzComputeArrayFn(() =>
      this.toArray().filter((value, index) => filterFn(value, index, this))
    );
  }

  includes(value: T | zzReadonly<T>): IReadOnlyReactive<boolean> {
    if (zzReadonly.isReactive(value)) {
      return zzCompute(() => this.toArray().includes(value.value));
    }

    return zzCompute(() => this.toArray().includes(value as T));
  }

  find(findFn: (value: T, index: number, array: this) => boolean) {
    return zzCompute(() =>
      this.toArray().find((value, index) => findFn(value, index, this))
    );
  }

  sort(sortFn: (a: T, b: T) => number) {
    return new zzComputeArrayFn(() => this.toArray().slice().sort(sortFn));
  }

  join(join: zzReadonly<string>) {
    const joinedString = zzCompute(() => this.value.join(join.value));

    return joinedString;
  }

  map<NewT>(mapFn: (value: T, self: zzReadonlyArray<T>) => NewT) {
    return new zzArrayMap<T, NewT>(this, mapFn);
  }

  compute<NewT>(computeFn: (array: T[]) => NewT[]) {
    return new zzComputeArrayFn(() => computeFn(this.toArray()));
  }

  flat() {
    return new zzArrayFlat(this);
  }

  constructor(value: T[] = []) {
    super(value);
  }
}

import { zzEvent } from "../../Event";
import { zzCompute } from "../compute";
import { zzComputeArrayFn } from "./compute";
import { zzArrayFlat } from "./flat";
import { zzArrayMap } from "./map";
import { zzArrayIndex } from "./indexes";
import { safeInsertToArray } from "./tools";