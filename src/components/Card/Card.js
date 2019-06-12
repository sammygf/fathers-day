import React from 'react';
import './Card.scss';
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
      <div className={classNames('App', {
        'animating': this.state.animating
      })}>
        <div className="background">
          <Bg className="background__image"/>
          <div className="character">
            <img src={this.state.src} className="character__face"/>
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
