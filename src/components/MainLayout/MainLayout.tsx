import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { Notification } from '../Notification';
import { NotificationContext } from '../../contexts/NotificationContext';

import styles from './MainLayout.module.scss';
import generalStyles from '../../styles/General.module.scss';

export const MainLayout = () => {
  const { notificationMessage } = useContext(NotificationContext);

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main_wrapper}>
        <div className={generalStyles.container}>
          <main>
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />

      {notificationMessage && (
        <Notification />
      )}
    </div>
  );
};