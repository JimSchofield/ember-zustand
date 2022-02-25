import Component from '@glimmer/component';
import { myStore, doToggle, doSetAnotherProp } from '../store/myStore';
import { tracked } from '@glimmer/tracking';
import zustand from '../utils/wrap';

@zustand({ store: myStore })
export default class MyComponent extends Component {
  store = myStore;

  @tracked value;
  @tracked text;

  constructor() {
    super(...arguments);

    myStore.subscribe(
      (state) => state.toggle,
      (state) => {
        this.value = state;
      }
    );

    myStore.subscribe(
      (state) => state.anotherProp,
      (state) => {
        console.log(state);
        this.text = state;
      }
    );
  }

  toggle = doToggle;
  update = (event) => doSetAnotherProp(event);
}
