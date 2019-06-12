import React from 'react';
import styles from './Home.module.scss';
import logo from '../../images/logo.png';
import { Link } from "react-router-dom";
import { Button } from '../Button/Button';

export class Home extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <img src={logo} alt="Brabrabra" className={styles.logo}/>
        <div className={styles.text}>
          <p>Привіт!</p>
          <p>Ми впевненні, що у тебе найкращій тато в світі! І не просто кращій, а справжнісінький супергерой! Тож
            прівитаємо його з днем батька так, щоб весь світ дізнався про це! Всього в декілька рухів ти можеш зробити
            листівку з татом в різніхобразах на твій вибір.</p>
          <p>Знайди найркаще фото анфас твого татка і скористайся нашім конструктором :)</p>
        </div>
        <Link to={'/upload'}>
          <Button>Зробити листівку</Button>
        </Link>
      </div>
    )
  }
}
