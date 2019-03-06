import { isPureObject, isArray } from '@/util';

/**
 * create component
 */
function createDOM(component: IComponent): HTMLElement {
  const { tag, id, attributes = {}, classList = [], children } = component;
  const element = createElement(tag);
  setAttribute(element, id, attributes);
  setClass(element, classList);
  setChildren(element, children);
  return element;
}

/**
 * create html element
 */
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

/**
 * attach attributes to the element
 */
function setAttribute(
  element: HTMLElement,
  id: string,
  attributes: { [key: string]: string | number | boolean }
) {
  Object.entries({ id, ...attributes }).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

/**
 * attach classes to the element
 */
function setClass(element: HTMLElement, classList: Array<string>) {
  classList.forEach(className => element.classList.add(className));
}

/**
 * attach children to the element
 * which includes textNode and ohther tags
 */
function setChildren(
  element: HTMLElement,
  children: string | number | IComponent | Array<IComponent>
) {
  if (isPureObject(children)) {
    element.appendChild(createDOM(children as IComponent));
  } else if (isArray(children)) {
    (children as Array<IComponent>).forEach(component =>
      element.appendChild(createDOM(component))
    );
  } else {
    element.appendChild(document.createTextNode(String(children)));
  }
}

export { createDOM };
