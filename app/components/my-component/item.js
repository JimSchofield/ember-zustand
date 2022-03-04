import Component from '@glimmer/component';
import { doDeleteIngredient } from '../../store/myStore';

export default class MyComponentItemComponent extends Component {
  remove = () => {
    doDeleteIngredient(this.args.index);
  };
}
