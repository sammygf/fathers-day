import React from 'react';
import * as firebase from "firebase/app";
import firebaseConfig from './firebase/config';
import logo from './logo.svg';
import './App.scss';
// import * as faceapi from 'face-api.js';
import { ReactComponent as Bg } from './images/backgrounds/1.svg'
import character from './images/backgrounds/character.png'
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
    }));

    firebase.initializeApp(firebaseConfig)
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
        {/*<img src={this.state.src} className="App-logo" alt="logo" ref={ref => this.imgRef = ref}/>*/}
        <div className="background">
          <Bg className="background__image"/>
          <div className="character">
            <img src={face} alt="" className="character__face"/>
            <img src={character} className="character__image"/>
          </div>
          <div className="top-text">
            <img src={top} alt=""/>
            <span>Вітаю з днем батька найсуперовішого
            тата!</span>
          </div>
          <div className="bottom-text">
            <img src={bottom} alt=""/>
            <span>Я вірю тільки в таких супергероїв!
            Твоя Алла.</span>
          </div>
        </div>
        {/*<input id="myFileUpload" type="file" onChange={this.onImageSelected} accept=".jpg, .jpeg, .png"/>*/}
      </div>
    );
  }
}

export default App;
