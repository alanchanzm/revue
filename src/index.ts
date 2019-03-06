import { Revue } from '@/reactive';

const rm = new Revue({
  el: 'app',
  state: { a: 1, checked: false },
  watchers: {
    a(current: any, prev: any) {
      console.log(`switch a from ${prev} to ${current}`);
    },
    b(current: any) {
      console.log(`add b equals ${current}`);
    }
  },
  component: {
    tag: 'div',
    id: 'test',
    classList: ['wrapper'],
    children: [
      { tag: 'span', children: 'this is a test' },
      {
        tag: 'input',
        attributes: {
          type: 'text',
          value: '{{ a }}'
        }
      }
    ]
  }
});

rm.setState({ a: 5, b: 3 });
