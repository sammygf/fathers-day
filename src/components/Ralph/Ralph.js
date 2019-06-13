import React from 'react';
import styles from './Ralph.module.scss';
import character from './ralph_empty.png'

export class Ralph extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img src={this.props.src} className={styles.face}/>
        <img src={character} className={styles.character}/>
      </React.Fragment>
    );
  }
}
