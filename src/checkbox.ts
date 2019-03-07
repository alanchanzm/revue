import { Revue } from '@/reactive';

const Checkbox = new Revue({
  state: { value: 'checkbox' },
  watchers: {
    value(current: any) {
      console.log(current);
    }
  }
});

Checkbox.attachComponent({
  tag: 'input',
  attributes: {
    type: 'checkbox',
    value: Checkbox.state.value,
    checked: 'checked'
  },
  events: {
    click(event: Event) {
      console.log(event);
    }
  }
});

export { Checkbox };
