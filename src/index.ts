import { Revue } from '@/reactive';
import { Checkbox } from './checkbox';

const App = new Revue({
  state: { a: 1, checked: false },
  watchers: {
    a(curent: any, prev: any) {
      console.log(`change a from ${prev} to ${curent}`);
    }
  }
});

App.attachComponent(
  {
    tag: 'div',
    id: 'test',
    classList: ['wrapper'],
    children: [
      { tag: 'span', children: 'this is a test' },
      {
        tag: 'input',
        attributes: {
          type: 'text',
          value: App.state.a
        }
      },
      {
        tag: 'button',
        children: 'click',
        events: {
          click: handleClick
        }
      },
      Checkbox.component
    ]
  },
  'app'
);

function handleClick(event: Event) {
  const { currentTarget } = event;
  console.log(currentTarget);
}

App.setState({ a: 5, b: 3 });
