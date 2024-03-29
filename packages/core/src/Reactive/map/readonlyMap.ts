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
import { zzEvent } from "../../Event";
import { zzComputeArray } from "../array";
import { IReadOnlyArray } from "../array/readonlyArray";
import { zzCompute } from "../compute";
import {
  IReadOnlyReactive,
  ReactiveEventChange,
  zzReactiveValueGetObserver,
  zzReadonly,
} from "../reactive";

export interface IReactiveMapEventSet<TKey, TValue> {
  value: TValue | undefined;
  last: TValue | undefined;
  key: TKey;
  target: zzReadonlyMap<TKey, TValue>;
}

export class ReactiveMapEventSet<TKey, TValue>
  implements IReactiveMapEventSet<TKey, TValue>
{
  constructor(
    public readonly value: TValue | undefined,
    public readonly last: TValue | undefined,
    public readonly key: TKey,
    public readonly target: zzReadonlyMap<TKey, TValue>
  ) {}
}

export interface IReadOnlyMap<TKey, TValue>
  extends IReadOnlyReactive<Map<TKey, TValue>> {
  readonly onSet: zzEvent<(event: ReactiveMapEventSet<TKey, TValue>) => void>;
  toMap(): Map<TKey, TValue>;
  itemsListener(
    addFn: (item: TValue, key: TKey, set: this) => IDestructor | void,
    removeFn?: (item: TValue, key: TKey, set: this) => void
  ): this;
  has(key: TKey): IReadOnlyReactive<boolean>;
  get(key: TKey): IReadOnlyReactive<undefined | TValue>;
  values(): IReadOnlyArray<TValue>;
  keys(): IReadOnlyArray<TKey>;
  entries(): IReadOnlyArray<[TKey, TValue]>;
  get size(): number;
}

export class zzReadonlyMap<TKey, TValue>
  extends zzReadonly<Map<TKey, TValue>>
  implements IReadOnlyMap<TKey, TValue>
{
  readonly onSet = new zzEvent<
    (event: ReactiveMapEventSet<TKey, TValue>) => void
  >();

  destroy(): void {
    super.destroy();
    this.onSet.destroy();
  }

  *[Symbol.iterator]() {
    for (let el of this.toMap()) {
      yield el;
    }
  }

  toMap() {
    zzReactiveValueGetObserver.add(this);

    return this._value;
  }

  protected set(key: TKey, element: TValue) {
    const lastValue = this._value.get(key);

    if (lastValue !== element) {
      this._value.set(key, element);

      this.onSet.emit(new ReactiveMapEventSet(element, lastValue, key, this));

      this.onChange.emit(
        new ReactiveEventChange(this._value, this._value, this)
      );
    }

    return this;
  }

  protected delete(key: TKey) {
    if (this._value.has(key)) {
      const lastValue = this._value.get(key);

      this._value.delete(key);

      this.onSet.emit(new ReactiveMapEventSet(undefined, lastValue, key, this));

      this.onChange.emit(
        new ReactiveEventChange(this._value, this._value, this)
      );
    }

    return this;
  }

  protected clear() {
    const entries = [...this._value.entries()];

    this._value.clear();

    for (const [key, value] of entries) {
      this.onSet.emit(new ReactiveMapEventSet(undefined, value, key, this));
    }

    this.onChange.emit(new ReactiveEventChange(this._value, this._value, this));

    return this;
  }

  itemsListener(
    addFn: (item: TValue, key: TKey, set: this) => void,
    removeFn: (item: TValue, key: TKey, set: this) => void = () => {}
  ) {
    const destructionMap = new Map<TKey, IDestructor>();

    const addEvent = this.onSet.addListener((ev) => {
      if (ev.last !== undefined) {
        const toDestroy = destructionMap.get(ev.key);
        if (toDestroy) {
          toDestroy.destroy();
          destructionMap.delete(ev.key);
        }

        removeFn.call(this, ev.last, ev.key, this);
      }

      if (ev.value !== undefined) {
        const toDestroy = zzDestructorsObserver.catch(() =>
          addFn.call(this, ev.value!, ev.key, this)
        );

        if (toDestroy.size > 0) {
          destructionMap.set(ev.key, toDestroy);
        }
      }
    });

    const destructor = new DestructorsStack(addEvent);

    this.toMap().forEach((element, key) =>
      addEvent.run(new ReactiveMapEventSet(element, undefined, key, this))
    );

    destructor.addFunc(() => {
      this.toMap().forEach((element, key) =>
        addEvent.run(new ReactiveMapEventSet(undefined, element, key, this))
      );
    });

    return this;
  }

  has(key: TKey) {
    return zzCompute(() => this.value.has(key));
  }

  get(key: TKey) {
    return zzCompute(() => this.value.get(key));
  }

  values() {
    return zzComputeArray(() => [...this.toMap().values()]);
  }

  keys() {
    return zzComputeArray(() => [...this.toMap().keys()]);
  }

  entries() {
    return zzComputeArray(() => [...this.toMap().entries()]);
  }

  get size() {
    return this.toMap().size;
  }

  get value() {
    return this.toMap();
  }

  constructor(value: [TKey, TValue][] = []) {
    super(new Map(value));
  }
}
