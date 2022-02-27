import { notifyPropertyChange, defineProperty } from '@ember/object';
import { assert } from '@ember/debug';

export default function zustand(config) {
  const { store, keys } = config;

  return function decoratorFn(Wrapped) {
    Wrapped.prototype._zstore = store;

    Object.defineProperty(Wrapped.prototype, 'zstore', {
      get() {
        return store.getState();
      },
    });

    class WithStore extends Wrapped {
      constructor() {
        super(...arguments);

        this._unsubs = [];

        keys.forEach((key) => {
          Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get() {
              return this.zstore[key];
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
            () => {
              notifyPropertyChange(this, key);
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
