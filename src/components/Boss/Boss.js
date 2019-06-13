import React from 'react';
import styles from './Boss.module.scss';
import character from './boss.png'

export class Boss extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img src={this.props.src} className={styles.face}/>
        <img src={character} className={styles.character}/>
      </React.Fragment>
    );
  }
}
