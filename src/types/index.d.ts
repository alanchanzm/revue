interface IRevue {
  state: { [key: string]: any };
  watchers: { [key: string]: Function };
  reference: Set<string>;
  fragment?: HTMLElement;
}

interface IRevueOptions {
  state?: any;
  watchers?: { [key: string]: Function };
}

interface IComponent {
  key?: string;
  tag: string;
  id?: string;
  classList?: Array<string>;
  attributes?: { [key: string]: string | number | boolean };
  children?: string | number | IComponent | Array<IComponent>;
  events?: { [key: string]: EventListener };
}
