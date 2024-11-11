import { dev } from '$app/environment';
import { fragment, FragmentStore, PendingValue, type Fragment } from '$houdini';
import { derived, type Readable } from 'svelte/store';

export { default as LoadingChurros } from '$lib/components/LoadingChurros.svelte';
export { default as LoadingSpinner } from '$lib/components/LoadingSpinner.svelte';
export { default as LoadingText } from '$lib/components/LoadingText.svelte';

/**
 * To develop a loading state, set this to true
 * WARNING: NEVER LEAVE THIS TRUE WHEN COMITTING
 * TODO: Add a CI check that makes sure this is false
 */
const SIMULATE_LOADING_STATE = false;

function simulatingLoadingState(): boolean {
  // Safeguard to prevent simulating loading states on production
  return dev && SIMULATE_LOADING_STATE;
}

export type MaybeLoading<T> = T | null | undefined | typeof PendingValue;

/**
 * Provide a fallback value if the value is PendingValue
 * @param value the value
 * @param fallback the fallback to use if value is PendingValue
 * @returns the value or the fallback
 */
export function loading<T>(value: MaybeLoading<T>, fallback: T): T {
  if (simulatingLoadingState()) return fallback;
  return value === PendingValue || value === null || value === undefined ? fallback : value;
}

export type AllLoaded<T> =
  T extends Loading<infer U>
    ? U
    : T extends object
      ? { [K in keyof T]: AllLoaded<T[K]> }
      : T extends unknown[]
        ? AllLoaded<T[number]>[]
        : T extends typeof PendingValue
          ? never
          : T;

export type DeepMaybeLoading<T> = T extends object
  ? { [K in keyof T]: DeepMaybeLoading<T[K]> }
  : T extends unknown[]
    ? DeepMaybeLoading<T[number]>[]
    : MaybeLoading<T>;

export function loaded<T>(value: MaybeLoading<T>): value is T {
  if (simulatingLoadingState()) return false;
  return value !== PendingValue;
}

export function onceLoaded<I, O>(
  value: MaybeLoading<I>,
  compute: (loadedValue: I) => O,
  fallback: O,
): O {
  return loaded(value) ? compute(value) : fallback;
}

export function onceAllLoaded<T extends unknown[], O, FO>(
  values: { [K in keyof T]: MaybeLoading<T[K]> },
  compute: (...loadedValues: T) => O,
  fallback: FO,
): O | FO {
  if (values.every(loaded)) return compute(...(values as T));
  return fallback;
}

// @ts-expect-error don't know how to fix the 'T could be instanciated with a type that is unrelated to AllLoaded' error
export function allLoaded<T>(value: T): value is AllLoaded<T> {
  if (simulatingLoadingState()) return false;
  if (Array.isArray(value)) return value.every((item) => allLoaded(item));
  else if (typeof value === 'object' && value !== null)
    return Object.values(value).every((item) => allLoaded(item));

  return value instanceof Loading ? value.loaded() : loaded(value);
}

export function mapLoading<T, O>(
  value: MaybeLoading<T>,
  mapping: (value: T) => O,
): MaybeLoading<O> {
  if (loaded(value)) return mapping(value);
  return PendingValue;
}

export function mapAllLoading<T extends unknown[], O>(
  values: { [K in keyof T]: MaybeLoading<T[K]> },
  mapping: (...values: T) => O,
): MaybeLoading<O> {
  return onceAllLoaded(values, mapping, PendingValue);
}

export const LOREM_IPSUM = `Lorem ipsum dolor sit amet. A impedit beatae sed nostrum voluptatem
ut omnis aliquid et galisum quaerat. Est sunt voluptatem aut porro iste et tempora voluptatem
aut pariatur minima sed omnis cumque est iusto fugit vel rerum magni. 33 ducimus nesciunt ut
consequuntur esse nam necessitatibus tempore sit suscipit voluptatibus qui rerum earum non autem
doloribus. Rem itaque esse est nostrum optio id repellat recusandae et ipsa quis.

Aut odio ipsa sed autem esse ut autem error qui voluptates perspiciatis aut officiis consequuntur
sit amet nihil. Eos delectus consequatur sit natus iure qui omnis omnis ea illum distinctio et
quos quidem. Et nisi autem est rerum eius ut dolorum commodi et temporibus expedita ea dolorem 
error ad asperiores facilis ad numquam libero. Aut suscipit maxime sit explicabo dolorem est
accusantium enim et repudiandae omnis cum dolorem nemo id quia facilis.

Et dolorem perferendis et rerum suscipit qui voluptatibus quia et nihil nostrum 33 omnis soluta. 
Nam minus minima et perspiciatis velit et eveniet rerum et nihil voluptates aut eaque ipsa et 
ratione facere!`;

export function loadingFragment<
  Store extends FragmentStore<any, any, any>,
  Data = Store extends FragmentStore<infer D, any, any> ? D : any,
>(fragmentRef: Fragment<any> | null, store: Store): Readable<null | Loading<Data>> {
  return derived([fragment(fragmentRef, store)], ([$store]) =>
    $store ? new Loading($store) : null,
  );
}

export class Loading<T> {
  v: typeof PendingValue | AllLoaded<T>;

  constructor(value?: T) {
    if (value instanceof Loading) this.v = value.v;
    if (value !== undefined && allLoaded(value)) this.v = value;
    this.v = PendingValue;
  }

  static collect<Value>(values: Array<Loading<Value>>): Loading<Value[]> {
    if (values.some((v) => !v.loaded())) return new Loading([PendingValue] as Value[]);
    return new Loading(values as Value[]);
  }

  loading(): this is { v: typeof PendingValue } {
    return !this.loaded();
  }

  loaded(): this is { v: AllLoaded<T> } {
    if (simulatingLoadingState()) return false;
    return this.v !== PendingValue;
  }

  map<O>(mapper: (value: AllLoaded<T>) => O): Loading<O> {
    return new Loading(this.loaded() ? mapper(this.v) : PendingValue);
  }

  unwrap<Fallback>(fallback: Fallback): T | Fallback;
  unwrap(): T | undefined;
  unwrap<Fallback>(fallback?: Fallback) {
    return this.loaded() ? this.v : fallback;
  }

  then<Out, Fallback>(mapper: (value: AllLoaded<T>) => Out, fallback: Fallback): T | Fallback;
  then<Out>(mapper: (value: AllLoaded<T>) => Out): T | undefined;
  then<Out, Fallback>(mapper: (value: AllLoaded<T>) => Out, fallback?: Fallback) {
    return this.map(mapper).unwrap(fallback);
  }
}
