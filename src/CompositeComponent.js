/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable new-cap */
import { instantiateComponent, isClass } from './utils';

/**
 * @description
 * Создает user-defined компонент
 */
class CompositeComponent {

  constructor(element) {
    this.currentElement = element;
    this.renderedComponent = null;
    this.publicInstance = null;
  }

  getPublicInstance() {
    return this.publicInstance;
  }

  mount() {
    const element = this.currentElement;
    const { type } = element;
    const { props } = element;

    let publicInstance;
    let renderedElement;

    /**
     * Рендеринг в зависимости от типа user-defined компонента
     */
    if (isClass(type)) {
      publicInstance = new type(props);
      publicInstance.props = props;

      if (publicInstance.componentWillMount) {
        publicInstance.componentWillMount();
      }
      renderedElement = publicInstance.render();
    } else if (typeof type === 'function') {
      publicInstance = null;
      renderedElement = type(props);
    }

    this.publicInstance = publicInstance;

    /**
     * Рекурсивный проход по вложенным компонентам
     */
    const renderedComponent = instantiateComponent(renderedElement);
    this.renderedComponent = renderedComponent;

    return renderedComponent.mount();
  }

}

export default CompositeComponent;
