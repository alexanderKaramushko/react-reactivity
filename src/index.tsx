/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactElement } from 'react';
import { render, unmountTree } from './utils';

/**
 * Functional Composite component
 */
const Input = (): ReactElement => <input type="text" />;

/**
 * Class Composite component
 */
export default class App extends React.PureComponent {

  componentWillMount() {
    console.log('App will mount');
  }

  componentWillUnmount() {
    console.log('App will unmount');
  }

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

setTimeout(() => {
  unmountTree(rootEl);
}, 1000);
