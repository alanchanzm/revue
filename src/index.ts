import { Revue } from '@/reactive';

const rm = new Revue({
  state: { a: 1 },
  watchers: {
    a(current: any, prev: any) {
      console.log(`switch a from '${prev} to ${current}`);
    },
    b(current: any) {
      console.log(`add b equals ${current}`);
    }
  }
});

rm.setState({ a: 5, b: 3 });
