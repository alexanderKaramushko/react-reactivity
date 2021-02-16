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

render(<App />, rootEl);
