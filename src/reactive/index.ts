class Revue {
  public state: any;
  public watchers: { [key: string]: Function };
  constructor(options: IRevueOptions) {
    const { state, watchers } = options;
    this.state = state;
    this.watchers = watchers;
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
