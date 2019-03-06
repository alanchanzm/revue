import { createDOM } from './compiler';

class Revue {
  private _root: HTMLElement;
  public state: any;
  public watchers: { [key: string]: Function };
  constructor(options: IRevueOptions) {
    const { el, state, watchers, component } = options;
    this.state = state;
    this.watchers = watchers;

    this._init(el, component);
  }

  _init(el: string, component: IComponent) {
    this._root = document.getElementById(el);
    const child = createDOM(component);
    this._root.appendChild(child);
  }

  setState(data: any) {
    Object.entries(data).forEach(([key, value]) => {
      const fn = this.watchers[key];
      const prev = this.state[key];
      typeof fn === 'function' && fn(value, prev);
    });

    Object.assign(this.state, data);
  }
}

export { Revue };
