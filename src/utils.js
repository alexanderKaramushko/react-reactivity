/* eslint-disable @typescript-eslint/explicit-function-return-type */

import CompositeComponent from './CompositeComponent';
import DOMComponent from './DOMComponent';

function isCompositeElement(element) {
  const { type } = element;

  return typeof type === 'function';
}

function isHostElement(element) {
  const { type } = element;

  return typeof type === 'string';
}

export function isClass(type) {
  /**
   * Подклассы React имеют свойство isReactComponent
   */
  return (
    Boolean(type.prototype)
    && Boolean(type.prototype.isReactComponent)
  );
}

/**
 * @description
 * Создание инстанса компонента в зависимости от типа элемента
 */
export function instantiateComponent(element) {
  if (isCompositeElement(element)) {
    return new CompositeComponent(element);
  } if (isHostElement(element)) {
    return new DOMComponent(element);
  }
  return null;
}

/**
 * @description
 * Рекурсивный mount всех компонентов в containerNode
 */
export function render(element, containerNode) {
  const rootComponent = instantiateComponent(element);

  const node = rootComponent.mount();
  containerNode.appendChild(node);

  const publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}
