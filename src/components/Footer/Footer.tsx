import styles from './Footer.module.scss';
import generalStyles from '../../styles/General.module.scss';

export const Footer = () => {
  return (
    <div className={styles.footer_wrapper}>
      <div className={generalStyles.container}>
        <footer className={styles.footer}>
          Developed with love
        </footer>
      </div>
    </div>
  );
};