/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { instantiateComponent } from './utils';

/**
 * @description
 * Создает host-компонент
 */
class DOMComponent {

  constructor(element) {
    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
  }

  getPublicInstance() {
    return this.node;
  }

  mount() {
    const element = this.currentElement;
    const { type } = element;
    const { props } = element;

    let children = props.children || [];

    if (!Array.isArray(children)) {
      children = [children];
    }

    const node = document.createElement(type);
    this.node = node;

    Object.keys(props).forEach((propName) => {
      if (propName !== 'children') {
        node.setAttribute(propName, props[propName]);
      }
    });

    /**
     * Рекурсивный проход по вложенным компонентам
     */
    const renderedChildren = children.map(instantiateComponent);

    this.renderedChildren = renderedChildren;

    /**
     * Отрендерить вложенные компоненты
     */
    const childNodes = renderedChildren.map((child) => child.mount());

    childNodes.forEach((childNode) => node.appendChild(childNode));

    return node;
  }

  unmount() {
    const { renderedChildren } = this;

    renderedChildren.forEach((child) => child.unmount());
  }

}

export default DOMComponent;
