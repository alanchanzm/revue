import { isPureObject, isArray } from '@/util';

/**
 * create component
 */
function createDOM(rm: IRevue, component: IComponent): HTMLElement {
  const {
    tag,
    attributes = {},
    classList = [],
    children,
    events = {}
  } = component;
  const element = createElement(rm, tag);
  setAttribute(rm, element, attributes);
  setClass(rm, element, classList);
  setChildren(rm, element, children);
  setEvent(element, events);
  return element;
}

/**
 * create html element
 */
function createElement(rm: IRevue, tag: string): HTMLElement {
  tag = getState(rm, tag);
  return document.createElement(tag);
}

/**
 * attach attributes to the element
 */
function setAttribute(
  rm: IRevue,
  element: HTMLElement,
  attributes: { [key: string]: string | number | boolean }
) {
  Object.entries(attributes).forEach(([key, value]) => {
    value = getState(rm, String(value));
    element.setAttribute(key, String(value));
  });
}

/**
 * attach classes to the element
 */
function setClass(rm: IRevue, element: HTMLElement, classList: Array<string>) {
  classList.forEach(className => {
    className = getState(rm, className);
    element.classList.add(className);
  });
}

/**
 * attach children to the element
 * which includes textNode and ohther tags
 */
function setChildren(
  rm: IRevue,
  element: HTMLElement,
  children: string | number | IComponent | Array<IComponent>
) {
  switch (true) {
    case isPureObject(children):
      element.appendChild(createDOM(rm, children as IComponent));
      break;
    case isArray(children):
      (children as Array<IComponent>).forEach(component =>
        element.appendChild(createDOM(rm, component))
      );
      break;
    default:
      children = children ? getState(rm, String(children)) : '';
      element.appendChild(document.createTextNode(String(children)));
      break;
  }
}

/**
 * add event listeners to the element
 */
function setEvent(
  element: HTMLElement,
  events: { [key: string]: EventListener }
) {
  Object.entries(events).forEach(([type, fn]) => {
    element.addEventListener(type, fn);
  });
}

/**
 * check if value is a pure string or a state property
 */
function getState(rm: IRevue, value: string): any {
  const stateRE = /{{(.*)}}/;
  if (stateRE.test(value)) {
    const [, key] = stateRE.exec(value);
    addToReference(rm, key.trim());
    value = rm.state[key.trim()];
  }
  return value;
}

function addToReference(rm: IRevue, key: string) {
  rm.reference.add(key);
}

export { createDOM };
