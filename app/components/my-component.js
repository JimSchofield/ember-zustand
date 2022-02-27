import Component from '@glimmer/component';
import { myStore, doToggle, doSetAnotherProp } from '../store/myStore';
import zustand from '../utils/wrap';

@zustand({
  store: myStore,
  keys: ['anotherProp', 'toggle'],
})
export default class MyComponent extends Component {
  doToggle = doToggle;
  update = (event) => doSetAnotherProp(event.target.value);

  get textLength() {
    return this.anotherProp.length;
  }

  clear = () => {
    this.zstore.setAnotherProp('');
    this.zstore.toggleAction(false);
  };
}
