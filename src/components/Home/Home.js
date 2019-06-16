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
          <p>Ми впевнені, що у тебе найкращий тато в світі! І не просто найкращий, він - справжнісінький супергерой!
            Тому
            давай привітаємо його з Днем Батька так, щоб весь світ дізнався про це! Всього в декілька кліків, зроби
            листівку з татом в будь-якому з образів.</p>
          <p>Лише знайди найкраще фото «анфас» твого татка і скористайся нашим
            конструктором :)</p>
        </div>
        <Link to={'/upload'}>
          <Button>Зробити листівку</Button>
        </Link>
      </div>
    )
  }
}

