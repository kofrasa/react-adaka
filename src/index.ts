import { Selector, Store } from "adaka";
import type { Callback, RawObject } from "mingo/types";
import { useSyncExternalStore } from "use-sync-external-store";

// re-export the createStore function.
export { createStore } from "adaka";

/**
 * Creates and returns a React selector hook to be used for retrieving data from the store.
 * @param store The store to use for obtaining data.
 * @returns {Callback}
 */
export const createSelectorHook = (
  store: Store<RawObject>
): Callback<RawObject, RawObject> => {
  const subscribers = new Map<Selector<RawObject>, Callback>();
  return (projection: RawObject, condition: RawObject = {}) => {
    // returns same instance for identical inputs.
    const selector = store.select(projection, condition);
    if (!subscribers.has(selector)) {
      subscribers.set(selector, ((cb: Callback<void>) =>
        selector.listenNow(cb)) as Callback);
    }
    return useSyncExternalStore(
      subscribers.get(selector) as Callback<Callback>,
      () => selector.get()
    );
  };
};
