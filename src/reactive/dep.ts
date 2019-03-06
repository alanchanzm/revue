class Dep {
  static target: any = null;

  private subs: any[];
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

class Watcher {
  constructor() {
    Dep.target = this;
  }
}
