import React from 'react';
import firebase from 'firebase';
import firebaseConfig from './../../firebase/config';
import { Redirect } from 'react-router-dom'
import styles from './Upload.module.scss';
import logo from '../../images/logo.png';
import shortid from 'shortid';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';

export class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      smallImage: null,
      isLoading: false
    };

    firebase.initializeApp(firebaseConfig);
    this.functions = firebase.functions();
    // this.functions.useFunctionsEmulator('http://localhost:5001');
    this.reader = new FileReader();
    this.detectFaces = this.functions.httpsCallable('detectFaces');
    this.reader = new FileReader();
  }

  writeFaceToDatabace(id, image) {
    firebase.database().ref('faces/' + id).set(image);
  }

  onImageSelected = event => {
    this.setState({
      isLoading: true,
    });
    this.processImage(event);
  };

  async processImage(event) {
    const file = event.target.files[0];
    this.reader.readAsDataURL(file);
    this.reader.onload = async event => {
      const image = event.target.result.replace(/^data:image\/[a-z]+;base64,/, '');
      const response = await this.detectFaces({
        image
      });
      const face = response.data;
      const base64 = event.target.result;
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
    };
  }

  render() {
    const { smallImage, isLoading } = this.state;

    if (smallImage) {
      return <Redirect to={{
        pathname: `/${this.state.id}`,
        smallImage,
      }}/>
    }

    return (
      <div className={styles.container}>
        <img src={logo} alt="Brabrabra" className={styles.logo}/>
        <div className={styles.text}>
          <p>Вибери супергероя, який найкраще відповідає характеру твого тата</p>
        </div>
        {isLoading && <Spinner/>}
        {!isLoading &&
          <Button>
            <div>Завантажити фото</div>
            <input type="file" onChange={this.onImageSelected} accept="image/*" className={styles.input}/>
          </Button>
        }
      </div>
    )
  }
}
