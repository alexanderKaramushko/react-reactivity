/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
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

export function unmountTree(containerNode) {
  const node = containerNode.firstChild;

  /**
   * CompositeComponent App
   */
  const rootComponent = node._internalInstance;

  rootComponent.unmount();
  containerNode.innerHTML = '';
}

/**
 * @description
 * Рекурсивный mount всех компонентов в containerNode
 */
export function render(element, containerNode) {
  if (containerNode.firstChild) {
    unmountTree(containerNode);
  }

  const rootComponent = instantiateComponent(element);

  const node = rootComponent.mount();
  containerNode.appendChild(node);

  node._internalInstance = rootComponent;

  const publicInstance = rootComponent.getPublicInstance();

  return publicInstance;
}
