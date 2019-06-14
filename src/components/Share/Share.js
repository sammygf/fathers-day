import React from 'react';
import styles from './Share.module.scss';

export class Share extends React.Component {
  render() {
    return (
      <div className={styles.share}>
        <div className={styles.content}>
          <p>Посилання скопійовано.</p>
          <p>Скоріше відправ його татові!</p>
        </div>
      </div>
    );
  }
}
