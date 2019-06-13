import React from 'react';
import firebase from 'firebase';
import firebaseConfig from './../../firebase/config';
import { Redirect } from 'react-router-dom'
import styles from './Upload.module.scss';
import robert from '../../images/robert.png';
import ralph from '../../images/ralph.png';
import boss from '../../images/boss.png';
import logo from '../../images/logo.png';
import shortid from 'shortid';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import Slider from "react-slick";
import debounce from 'lodash/debounce';
import { getBase64Strings } from 'exif-rotate-js/lib';

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      smallImage: null,
      isLoading: false,
      name: null,
    };

    firebase.initializeApp(firebaseConfig);
    this.functions = firebase.functions();
    // this.functions.useFunctionsEmulator('http://localhost:5001');
    this.detectFaces = this.functions.httpsCallable('detectFaces');
    this.selectedCharacter = 0;
  }

  writeFaceToDatabace(id, image) {
    const { name } = this.state;

    firebase.database().ref('faces/' + id).set({
      image,
      character: this.selectedCharacter,
      name,
    });
  }

  onImageSelected = event => {
    this.setState({
      isLoading: true,
    });
    this.processImage(event);
  };

  async processImage(event) {
    const data = await getBase64Strings(event.target.files);
    const base64 = data[0];
    const image = base64.replace(/^data:image\/[a-z]+;base64,/, '');
    const response = await this.detectFaces({ image });
    const face = response.data;
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const { noseTip, leftEar, rightEar, rightEyeCorner, leftEyeCorner } = face;
    const centerX = (leftEyeCorner.x + rightEyeCorner.x) / 2;
    const centerY = noseTip.y;
    const radius = (rightEar.x - leftEar.x) / 2;
    const x = centerX - radius;
    const y = centerY - radius;
    const size = radius * 2;
    const id = shortid.generate();

    img.onload = () => {
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, x, y, size, size, 0, 0, canvas.width, canvas.height);
      const smallImage = canvas.toDataURL();
      this.writeFaceToDatabace(id, smallImage);
      this.setState({
        smallImage,
        id,
      });
    };

    img.src = base64;
  }

  handleSlideChange = index => {
    this.selectedCharacter = index;
  };

  nameChanged = debounce(name => {
    this.setState({
      name,
    })
  }, 200);

  handleNameChange = event => {
    this.nameChanged(event.currentTarget.value)
  };

  render() {
    const { smallImage, isLoading, name } = this.state;

    console.log(name);

    if (smallImage) {
      return <Redirect to={{
        pathname: `/${this.state.id}`,
        smallImage,
        selectedCharacter: this.selectedCharacter,
        name,
      }}/>
    }

    return (
      <div className={styles.container}>
        <img src={logo} alt="Brabrabra" className={styles.logo}/>
        <div className={styles.text}>
          <p>Вибери супергероя, який найкраще відповідає характеру твого тата</p>
        </div>
        <Slider {...sliderSettings}
                className={styles.slider}
                afterChange={this.handleSlideChange}
                swipe={!isLoading}
                arrows={!isLoading}>
          <div>
            <img src={robert} alt="Brabrabra" className={styles.robert}/>
          </div>
          <div>
            <img src={boss} alt="Brabrabra" className={styles.boss}/>
          </div>
          <div>
            <img src={ralph} alt="Brabrabra" className={styles.ralph}/>
          </div>
        </Slider>
        {isLoading && <Spinner/>}
        {!isLoading && (
          <React.Fragment>
            <input type="text" className={styles.name} placeholder="Твоє ім'я" onChange={this.handleNameChange}/>
            <Button disabled={!name}>
              <div>Завантажити фото</div>
              <input type="file" onChange={this.onImageSelected} accept="image/*" className={styles.input}/>
            </Button>
          </React.Fragment>
        )}
      </div>
    )
  }
}
