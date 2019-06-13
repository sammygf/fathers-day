import React from 'react';
import styles from './Spinner.module.scss';
import classNames from 'classnames';

export class Spinner extends React.Component {
  render() {
    return (
      <div className={classNames(this.props.className, styles['lds-ellipsis'])}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
