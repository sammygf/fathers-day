import React from 'react';
import styles from './Boss.module.scss';
import character from './boss.png'

export class Boss extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faceLoaded: false,
      backgroundLaded: false,
    }
  }

  handleCharacterLoad = () => {
    this.setState({
      backgroundLaded: true,
    }, this.onLoad);
  };

  handleFaceLoad = () => {
    this.setState({
      faceLoaded: true,
    }, this.onLoad)
  };

  onLoad = () => {
    const { faceLoaded, backgroundLaded } = this.state;

    if (faceLoaded && backgroundLaded) {
      this.props.onLoad();
    }
  };

  render() {
    return (
      <React.Fragment>
        <img src={this.props.src} className={styles.face} onLoad={this.handleFaceLoad}/>
        <img src={character} className={styles.character} onLoad={this.handleCharacterLoad}/>
      </React.Fragment>
    );
  }
}
