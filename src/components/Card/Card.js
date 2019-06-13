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
    const { animating } = this.state;
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
            {/*<Boss src={this.state.src}/>*/}
            {/*<Ralph src={this.state.src}/>*/}
            <Robert src={this.state.src}/>
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
