import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

export const myStore = create(
  subscribeWithSelector((set) => ({
    toggle: false,
    toggleAction: () =>
      set((state) => {
        return {
          toggle: !state.toggle,
        };
      }),
    anotherProp: 'foobar',
    setAnotherProp: (event) => set({ anotherProp: event.target.value }),
  }))
);

export const doToggle = myStore.getState().toggleAction;
export const doSetAnotherProp = myStore.getState().setAnotherProp;
