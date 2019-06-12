import React from 'react';
import styles from './Button.module.scss';

export class Button extends React.Component {
  render() {
    return (
      <button className={styles.button}>
        {this.props.children}
      </button>
    );
  }
}
