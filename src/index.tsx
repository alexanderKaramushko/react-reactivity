/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ReactElement } from 'react';
import { render } from './utils';

/**
 * Class Composite component
 */
export default class App extends React.Component<{ placeholder?: string }> {

  componentWillMount() {
    console.log('App will mount');
  }

  componentWillUpdate() {
    console.log('App will update with props');
  }

  componentWillUnmount() {
    console.log('App will unmount');
  }

  render(): ReactElement {
    const { placeholder = '' } = this.props;

    return (
      /** Host component */
      <div>
        <input type="text" placeholder={placeholder} />
      </div>
    );
  }

}

const rootEl = document.getElementById('app');

render(<App />, rootEl);

// render(<App placeholder="Placeholder" />, rootEl);

// render(<Input />, rootEl);
