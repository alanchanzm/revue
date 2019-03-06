import { isPureObject, isArray } from '@/util';

/**
 * create component
 */
function createDOM(rm: IRevue, component: IComponent): HTMLElement {
  const { tag, id, attributes = {}, classList = [], children } = component;
  const element = createElement(rm, tag);
  setAttribute(rm, element, id, attributes);
  setClass(rm, element, classList);
  setChildren(rm, element, children);
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
  id: string,
  attributes: { [key: string]: string | number | boolean }
) {
  id = getState(rm, id);
  Object.entries({ id, ...attributes }).forEach(([key, value]) => {
    value = getState(rm, value);
    element.setAttribute(key, value);
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
  if (isPureObject(children)) {
    element.appendChild(createDOM(rm, children as IComponent));
  } else if (isArray(children)) {
    (children as Array<IComponent>).forEach(component =>
      element.appendChild(createDOM(rm, component))
    );
  } else {
    children = getState(rm, String(children));
    element.appendChild(document.createTextNode(String(children)));
  }
}

/**
 * check if value is a pure string or a state property
 */
function getState(rm: IRevue, value: string): any {
  const stateRE = /{{(.*)}}/;
  if (stateRE.test(value)) {
    const [, key] = stateRE.exec(value);
    value = rm.state[key.trim()];
  }
  return value;
}

export { createDOM };
