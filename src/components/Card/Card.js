import React from 'react';
import styles from './Card.module.scss';
import firebase from 'firebase';
import firebaseConfig from './../../firebase/config';
import { ReactComponent as Bg } from './images/backgrounds/1.svg'
import character from './images/backgrounds/character.png'
import top from './images/backgrounds/top.png'
import bottom from './images/backgrounds/bottom.png'
import classNames from 'classnames';

// import gif from './images/backgrounds/1.gif'

export class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animating: false,
    };
  }

  async componentDidMount() {
    const { smallImage } = this.props.location;
    const id = this.props.match.params.id;
    let src = null;

    if (smallImage) {
      src = smallImage;
    } else {
      firebase.initializeApp(firebaseConfig);
      const snapshot = await firebase.database().ref('/faces/' + id).once('value');
      src = snapshot.val();
    }

    this.setState({
      src,
      animating: true
    })
  }

  render() {
    return (
      <div className={classNames(styles.card, {
        [styles.animating]: this.state.animating
      })}>
        <div className={styles.background}>
          <Bg className={styles.backgroundImage}/>
          <div className={styles.character}>
            <img src={this.state.src} className={styles.characterFace} />
            <img src={character} className={styles.characterImage} />
          </div>
          <div className={styles.topText}>
            <img src={top} alt=""/>
            <span>Вітаю з днем батька найсуперовішого
            тата!</span>
          </div>
          <div className={styles.bottomText}>
            <img src={bottom} alt=""/>
            <span>Я вірю тільки в таких супергероїв!
            Твоя Алла.</span>
          </div>
        </div>
      </div>
    );
  }
}
