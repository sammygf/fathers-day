import React from 'react';
import styles from './Ralph.module.scss';
import character from './ralph.png'

export class Ralph extends React.Component {
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
      <div className={styles.hero}>
        <img src={this.props.src} className={styles.face} onLoad={this.handleFaceLoad}/>
        <img src={character} className={styles.character} onLoad={this.handleCharacterLoad}/>
      </div>
    );
  }
}
