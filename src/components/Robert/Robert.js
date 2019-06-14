import React from 'react';
import styles from './Robert.module.scss';
import character from './robert.png'

export class Robert extends React.Component {
  render() {
    return (
      <div className={styles.hero}>
        <img src={this.props.src} className={styles.face}/>
        <img src={character} className={styles.character}/>
      </div>
    );
  }
}
