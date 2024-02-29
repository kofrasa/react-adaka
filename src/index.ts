import { Store } from "adaka";
import type { RawObject } from "mingo/types";
import { useSyncExternalStore } from "use-sync-external-store";

// re-export the createStore function.
export { createStore } from "adaka";

/**
 * Creates and returns a React selector hook to be used for retrieving data from the store.
 * @param store The store to use for obtaining data.
 * @returns {Callback}
 */
export const createSelectorHook = <S extends RawObject>(store: Store<S>) => {
  return (projection: RawObject, condition: RawObject = {}) => {
    // returns same instance for identical inputs.
    const selector = store.select(projection, condition);
    return useSyncExternalStore(
      cb => selector.subscribe(cb, { runImmediately: true }),
      () => selector.get()
    );
  };
};
