import { createDOM } from './compiler';

class Revue implements IRevue {
  private _root: HTMLElement;
  private _component: IComponent;
  public state: { [key: string]: any };
  public watchers: { [key: string]: Function };
  public reference: Set<string>;
  constructor(options: IRevueOptions) {
    const { el, state, watchers, component } = options;

    this._root = document.getElementById(el);
    this._component = component;

    this.state = state;
    this.watchers = watchers;
    this.reference = new Set();

    this._init(component);
  }

  _init(component: IComponent) {
    const child = createDOM(this, component);
    this._root.appendChild(child);
  }

  setState(data: any) {
    Object.entries(data).forEach(([key, value]) => {
      const fn = this.watchers[key];
      const prev = this.state[key];

      if (prev !== value) {
        // set state
        this.state[key] = value;
        // run watchers
        typeof fn === 'function' && fn(value, prev);
        // refresh the page
        if (this.reference.has(key)) {
          this._root.childNodes.forEach(child => child.remove());
          this._init(this._component);
        }
      }
    });
  }
}

export { Revue };
