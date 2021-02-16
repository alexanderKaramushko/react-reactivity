import React, { ReactElement } from 'react';
import { render } from './utils';

/**
 * Functional Composite component
 */
const Input = (): ReactElement => <input type="text" />;

/**
 * Class Composite component
 */
export default class App extends React.PureComponent {

  render(): ReactElement {
    return (
      /** Host component */
      <div>
        <Input />
      </div>
    );
  }

}

const rootEl = document.getElementById('app');

/**
 *  @example
 *  [object CompositeComponent] {
 *    currentElement: <App />,
 *    publicInstance: null,
 *
 *    renderedComponent: [object DOMComponent] {
 *      currentElement: <div />,
 *      node: [object HTMLDivElement],
 *
 *      renderedChildren: [object CompositeComponent] {
 *        currentElement: <input />,
 *        node: [object HTMLInputElement],
 *        renderedChildren: []
 *      }
 *    }
 *  }
 */
render(<App />, rootEl);
