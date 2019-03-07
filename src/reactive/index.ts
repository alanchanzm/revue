import { createDOM } from './compiler';

class Revue implements IRevue {
  private _root: HTMLElement;

  public state: { [key: string]: any };
  public watchers: { [key: string]: Function };
  public reference: Set<string>;
  public component: IComponent;
  public fragment: HTMLElement;

  constructor(options: IRevueOptions) {
    const { state, watchers } = options;

    this.state = state;
    this.watchers = watchers;
    this.reference = new Set();
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
        // TODO: refresh the page
      }
    });
  }

  attachComponent(component: IComponent, el?: string) {
    this.component = component;

    if (el) {
      this._root = document.getElementById(el);
      this.fragment = createDOM(this, component);
      this._root.appendChild(this.fragment);
    }
  }
}

export { Revue };
