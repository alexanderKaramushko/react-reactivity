// eslint-disable-next-line max-classes-per-file
import React, { ReactElement } from 'react';
import { ClickCounterProps, ClickCounterState, UpdateButtonProps } from './types';

/**
 * @description React component
 * {
 *  type: UpdateButton,
 *  props: {
 *    onClick: Function,
 *    disabled: false,
 *  }
 * }
 */
class UpdateButton extends React.Component<UpdateButtonProps> {

  private disabled: boolean;
  private onClick: () => void;

  constructor(props: UpdateButtonProps) {
    super(props);

    const { disabled = false, onClick } = this.props;

    this.disabled = disabled;
    this.onClick = onClick;
  }

  /**
   * @description React elements
   * {
   *  type: 'button',
   *  props: {
   *    onClick: Function,
   *    disabled: false,
   *    type: 'button',
   *    children: 'Update counter',
   *  }
   * }
   */
  render(): ReactElement {
    return (
      <button
        onClick={this.onClick}
        disabled={this.disabled}
        type="button"
      >
        Update counter
      </button>
    );
  }

}

/**
 * @description React component
 * {
 *  type: ClickCounter,
 *  props: {},
 * }
 */
class ClickCounter extends React.Component<ClickCounterProps, ClickCounterState> {

  constructor(props: ClickCounterProps) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  handleClick = (): void => {
    this.setState((state) => ({ count: state.count + 1 }));
  }

  /**
   * @description React elements
   * {
   *  type: 'div',
   *  props: {
   *    children: [
   *      {
   *        type: UpdateButton,
   *        props: {
   *          onClick: Function,
   *          disabled: false,
   *        }
   *      },
   *      {
   *        type: 'span',
   *        props: {
   *          children: 0,
   *        }
   *      }
   *    ]
   *  }
   * }
   */
  render(): ReactElement {
    const { state } = this;
    const { count } = state;

    return (
      <div>
        <UpdateButton onClick={this.handleClick} disabled={count === 5} />
        <span>{state.count}</span>
      </div>
    );
  }

}

export default ClickCounter;
