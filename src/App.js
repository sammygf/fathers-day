import React from 'react';
import logo from './logo.svg';
import './App.scss';
// import * as faceapi from 'face-api.js';
import { ReactComponent as Bg } from './images/backgrounds/1.svg'
import character from './images/backgrounds/1.png'
import top from './images/backgrounds/top.png'
import bottom from './images/backgrounds/bottom.png'
import face from './images/face.png'
import classNames from 'classnames';

// import gif from './images/backgrounds/1.gif'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = null;
    this.state = {
      src: logo,
      animating: false,
    }
  }

  async componentDidMount() {
    // await faceapi.loadSsdMobilenetv1Model('/models');
    setTimeout(() => this.setState({
      animating: true
    }))
  }

  // onImageSelected = async event => {
  //   const file = event.target.files[0];
  //   const img = await faceapi.bufferToImage(file);
  //   this.setState({
  //     src: img.src,
  //   }, () => {
  //     // const results = faceapi.detectAllFaces(this.imgRef).withFaceLandmarks();
  //     // console.log(results);
  //   });
  // };

  onAnimationEnd = event => {
    console.log(event);
  };

  render() {
    return (
      <div className={classNames('App', {
        'animating': this.state.animating
      })} onAnimationEnd={this.onAnimationEnd}>
        <header className="App-header">
          {/*<img src={this.state.src} className="App-logo" alt="logo" ref={ref => this.imgRef = ref}/>*/}
          <div className="background">
            <Bg className="background__image"/>
            <div className="character">
              <img src={face} alt="" className="character__face"/>
              <img src={character} className="character__image"/>
            </div>
            <div style={{backgroundImage: `url(${top})`}} className="top-text">Вітаю з днем батька найсуперовішого тата!</div>
            <div style={{backgroundImage: `url(${bottom})`}} className="bottom-text">Я вірю тільки в таких супергероїв! Твоя Алла.</div>
          </div>
          {/*<input id="myFileUpload" type="file" onChange={this.onImageSelected} accept=".jpg, .jpeg, .png"/>*/}
        </header>
      </div>
    );
  }
}

export default App;
