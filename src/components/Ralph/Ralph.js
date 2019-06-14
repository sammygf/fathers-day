import React from 'react';
import styles from './Ralph.module.scss';
import character from './ralph.png'

export class Ralph extends React.Component {
  render() {
    return (
      <div className={styles.hero}>
        <img src={this.props.src} className={styles.face}/>
        <img src={character} className={styles.character}/>
      </div>
    );
  }
}
