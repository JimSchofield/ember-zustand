import { setComponentTemplate, getComponentTemplate } from '@ember/component';
import { hbs } from 'ember-cli-htmlbars';

export default function zustand(config) {
  const { store } = config;

  return function decoratorFn(Wrapped) {
    class WithStore {}

    const temp =  getComponentTemplate(Wrapped);
    if (!temp) {
      debugger;
      setComponentTemplate(hbs`<Wrapped />`, WithStore);
    }

    return WithStore;
  };
}

