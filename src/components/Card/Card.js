import React from 'react';
import styles from './Card.module.scss';
import firebase from 'firebase';
import firebaseConfig from './../../firebase/config';
import { ReactComponent as Bg } from './images/background.svg'
import top from './images/top.png'
import bottom from './images/bottom.png'
import classNames from 'classnames';
import { Spinner } from '../Spinner/Spinner';
import { Boss } from "../Boss/Boss";
import { Ralph } from "../Ralph/Ralph";
import { Robert } from "../Robert/Robert";

// import gif from './images/backgrounds/1.gif'

const characters = [Robert, Boss, Ralph];

export class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: false,
      selectedCharacter: 0,
    };
  }

  async componentDidMount() {
    let { smallImage, selectedCharacter, name } = this.props.location;
    const id = this.props.match.params.id;

    if (!smallImage) {
      firebase.initializeApp(firebaseConfig);
      const snapshot = await firebase.database().ref('/faces/' + id).once('value');
      const val = snapshot.val();
      if (!val) {
        window.location.replace('/');
      }
      smallImage = val.image;
      selectedCharacter = val.character;
      name = val.name;
    }

    this.setState({
      src: smallImage,
      animating: true,
      selectedCharacter,
      name,
    })
  }

  render() {
    const { animating, selectedCharacter, name } = this.state;
    const Character = characters[selectedCharacter];

    return (
      <div className={classNames(styles.card, {
        [styles.animating]: this.state.animating
      })}>
        <Spinner className={classNames(styles.spinner, {
          [styles.spinnerVisible]: !animating,
        })}/>
        <div className={styles.background}>
          <Bg className={styles.backgroundImage}/>
          <div className={styles.character}>
            <Character src={this.state.src}/>
          </div>
          <div className={styles.topText} style={{backgroundImage: `url(${top})`}}>
            <p>Вітаю з днем батька найсуперовішого
            тата!</p>
          </div>
          <div className={styles.bottomText} style={{backgroundImage: `url(${bottom})`}}>
            <p>Я вірю тільки в таких супергероїв!</p>
            <p>{name}</p>
          </div>
        </div>
      </div>
    );
  }
}
