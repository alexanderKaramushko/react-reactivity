/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
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

  receive(nextElement) {
    const prevElement = this.currentElement;
    const prevProps = prevElement.props;
    const nextProps = nextElement.props;

    this.currentElement = nextElement;

    Object.keys(prevProps).forEach((propName) => {
      if (propName !== 'children' && !nextProps.hasOwnProperty(propName)) {
        this.node.removeAttribute(propName);
      }
    });

    Object.keys(nextProps).forEach((propName) => {
      if (propName !== 'children') {
        this.node.setAttribute(propName, nextProps[propName]);
      }
    });

    let prevChildren = prevProps.children || [];

    if (!Array.isArray(prevChildren)) {
      prevChildren = [prevChildren];
    }

    let nextChildren = nextProps.children || [];

    if (!Array.isArray(nextChildren)) {
      nextChildren = [nextChildren];
    }

    const prevRenderedChildren = this.renderedChildren;
    const nextRenderedChildren = [];

    const operationQueue = [];

    for (let i = 0; i < nextChildren.length; i += 1) {
      const prevChild = prevRenderedChildren[i];

      /**
       * Добавляем новый элемент, если нет соответствия предыдущих и новых потомков
       */
      if (!prevChild) {
        const nextChild = instantiateComponent(nextChildren[i]);
        const node = nextChild.mount();

        operationQueue.push({ node, type: 'ADD' });
        nextRenderedChildren.push(nextChild);
        continue;
      }

      const canUpdate = prevChildren[i].type === nextChildren[i].type;

      /**
       * Заменяем старый элемент, если разные типы
       */
      if (!canUpdate) {
        const prevNode = prevChild.getHostNode();

        prevChild.unmount();

        const nextChild = instantiateComponent(nextChildren[i]);
        const nextNode = nextChild.mount();

        operationQueue.push({ nextNode, prevNode, type: 'REPLACE' });
        nextRenderedChildren.push(nextChild);
        continue;
      }

      prevChild.receive(nextChildren[i]);
      nextRenderedChildren.push(prevChild);
    }

    /**
     * Удаляем лишние элементы
     */
    for (let j = nextChildren.length; j < prevChildren.length; j += 1) {
      const prevChild = prevRenderedChildren[j];
      const node = prevChild.getHostNode();

      prevChild.unmount();

      operationQueue.push({ node, type: 'REMOVE' });
    }

    this.renderedChildren = nextRenderedChildren;

    /**
     * Обновляем всех потомков за один проход
     */
    while (operationQueue.length > 0) {
      const operation = operationQueue.shift();

      switch (operation.type) {
        case 'ADD':
          this.node.appendChild(operation.node);
          break;
        case 'REPLACE':
          this.node.replaceChild(operation.nextNode, operation.prevNode);
          break;
        case 'REMOVE':
          this.node.removeChild(operation.node);
          break;
        default:
          break;
      }
    }
  }

}

export default DOMComponent;
