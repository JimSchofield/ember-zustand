import { createStore } from '../utils/makeStore';

export const myStore = createStore((set) => ({
  toggle: false,
  toggleAction: () =>
    set((state) => {
      return {
        toggle: !state.toggle,
      };
    }),
  anotherProp: 'foobar',
  setAnotherProp: (value) => set({ anotherProp: value }),
  ingredients: ['Paprika', 'Salt'],
  addIngredient: (str) =>
    set((state) => ({
      ingredients: [...state.ingredients, str],
    })),
  deleteIngredient: (index) => {
    set((state) => ({
      ingredients: state.ingredients.filter((_, i) => index !== i),
    }));
  },
}));

export const doToggle = myStore.getState().toggleAction;
export const doSetAnotherProp = myStore.getState().setAnotherProp;
export const doAddIngredients = myStore.getState().addIngredient;
export const doDeleteIngredient = myStore.getState().deleteIngredient;
