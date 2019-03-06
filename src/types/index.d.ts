interface IRevueOptions {
  el: string;
  state?: any;
  watchers?: { [key: string]: Function };
  component?: IComponent;
}

interface IComponent {
  key?: string;
  tag: string;
  id?: string;
  classList?: Array<string>;
  attributes?: { [key: string]: string | number | boolean };
  children?: string | number | IComponent | Array<IComponent>;
}
