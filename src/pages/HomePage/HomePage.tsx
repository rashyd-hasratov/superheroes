// import { useState } from 'react';
// import axios from 'axios';
import { SuperheroesList } from '../../components/SuperheroesList/SuperheroesList';
import styles from './HomePage.module.scss';
import generalStyles from '../../styles/General.module.scss';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header_wrapper}>
        <div className={generalStyles.content}>
          <header className={styles.header}>
            <Link to={'/'} className={styles.logo}>
              Superheroes DB
            </Link>

            <Link
              to={'/add'}
              className={styles.add_button}
            >
              Add New
            </Link>
          </header>
        </div>
      </div>

      <div className={styles.main_wrapper}>
        <div className={generalStyles.content}>
          <SuperheroesList />
        </div>
      </div>

      <div className={styles.footer_wrapper}>
        <div className={generalStyles.content}>
          <footer className={styles.footer}>
            Developed with love
          </footer>
        </div>
      </div>
    </div>
  );
};
