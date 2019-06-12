import React from 'react';
import firebase from "firebase";
import firebaseConfig from './firebase/config';
import logo from './logo.svg';
// import faceMock from './face.mock';
import './App.scss';
import { ReactComponent as Bg } from './images/backgrounds/1.svg'
import character from './images/backgrounds/character.png'
import top from './images/backgrounds/top.png'
import bottom from './images/backgrounds/bottom.png'
import classNames from 'classnames';

// import gif from './images/backgrounds/1.gif'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = null;
    this.state = {
      src: logo,
      animating: false,
    };
    //    https://firebase.google.com/docs/database/web/start
    firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.functions = firebase.functions();
    this.functions.useFunctionsEmulator('http://localhost:5001');
    this.reader = new FileReader();
    this.detectFaces = this.functions.httpsCallable('detectFaces');
  }

  async componentDidMount() {
    setTimeout(() => this.setState({
      animating: true
    }));
  }

  onImageSelected = async event => {
    const file = event.target.files[0];
    this.reader.readAsDataURL(file);
    this.reader.onload = async event => {
      const image = event.target.result.replace(/^data:image\/[a-z]+;base64,/, '');
      const response = await this.detectFaces({
        image
      });
      const face = response.data;
      // const face = faceMock;
      const img = new Image();

      img.onload = () => {
        const canvas = this.canvas;
        const ctx = this.canvas.getContext('2d');
        const { noseTip, leftEar, rightEar, rightEyeCorner, leftEyeCorner } = face;
        const centerX = (leftEyeCorner.x + rightEyeCorner.x) / 2;
        const centerY = noseTip.y;
        const radius = (rightEar.x - leftEar.x) / 2;

        canvas.width = 100;
        canvas.height = 100;
        canvas.style.transform = `translate(-50%, -50%) rotateZ(${-face.rollAngle}deg)`;
        ctx.drawImage(img, centerX - radius, centerY - radius, radius * 2, radius * 2, 0, 0, canvas.width, canvas.height);
      };

      img.src = event.target.result;
    };
  };

  render() {
    return (
      <div className={classNames('App', {
        'animating': this.state.animating
      })}>
        <input type="file" onChange={this.onImageSelected} accept=".jpg, .jpeg, .png"/>

        <div className="background">
          <Bg className="background__image"/>
          <div className="character">
            <canvas ref={ref => this.canvas = ref} className="character__face"/>
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
      </div>
    );
  }
}

export default App;
