import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {
  myStore,
  doToggle,
  doSetAnotherProp,
  doAddIngredients,
} from '../store/myStore';
import zustand from '../utils/wrap';

@zustand({
  store: myStore,
  keys: ['anotherProp', 'toggle', 'ingredients'],
})
export default class MyComponent extends Component {
  doToggle = doToggle;
  update = (event) => doSetAnotherProp(event.target.value);

  get textLength() {
    return this.anotherProp.length;
  }

  @tracked tempIngredient = '';
  modifyTempIngredient = (event) => (this.tempIngredient = event.target.value);
  addIngredient = (ingredient) => doAddIngredients(ingredient);
  add = () => {
    this.addIngredient(this.tempIngredient);
    this.tempIngredient = '';
  };
}
