import { assert } from '@ember/debug';
import {
  createStorage,
  getValue,
  setValue,
} from 'ember-tracked-storage-polyfill';

export default function zustand(config) {
  const { store, keys } = config;

  // create a record of storages based off of the store
  const storageObj = Object.entries(store.getState()).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: createStorage(value),
    }),
    {}
  );

  return function decoratorFn(Wrapped) {
    Wrapped.prototype._zstore = store;

    class WithStore extends Wrapped {
      #_store = storageObj;

      constructor() {
        super(...arguments);

        this._unsubs = [];

        keys.forEach((key) => {
          Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get() {
              return getValue(this.#_store[key]);
            },
            set() {
              assert(
                'Cannot set store properties directly.  Create a hook to update the value.'
              );
            },
          });
        });

        keys.forEach((key) => {
          const unsub = this._zstore.subscribe(
            (state) => state[key],
            (value) => {
              setValue(this.#_store[key], value);
            }
          );

          this._unsubs.push(unsub);
        });
      }

      willDestroy() {
        this._unsubs.forEach((fn) => fn());
      }
    }

    return WithStore;
  };
}
