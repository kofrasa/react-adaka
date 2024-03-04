import { Store } from "adaka";
import type { AnyVal, RawObject } from "mingo/types";
import { useSyncExternalStore } from "use-sync-external-store";

// re-export the createStore function.
export { createStore } from "adaka";

/**
 * Creates and returns a React selector hook to be used for retrieving data from the store.
 * @param store The store to use for obtaining data.
 */
export const createSelectorHook = <S>(store: Store<S & RawObject>) => {
  return <T>(
    projection: Record<keyof T, AnyVal>,
    condition: RawObject = {}
  ) => {
    // returns same instance for identical inputs.
    const selector = store.select<T & RawObject>(projection, condition);
    return useSyncExternalStore<T>(
      listener => selector.subscribe(listener, { runImmediately: true }),
      () => selector.getState()
    );
  };
};
