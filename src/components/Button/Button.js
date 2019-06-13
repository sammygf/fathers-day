import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

export class Button extends React.Component {
  render() {
    return (
      <button className={classNames(styles.button, {
        [styles.disabled]: this.props.disabled
      })}>
        {this.props.children}
      </button>
    );
  }
}
