import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import generalStyles from '../../styles/General.module.scss';

export const Header = () => {
  const { pathname } = useLocation();
  const shouldShowAddLink = pathname !== '/add';

  return (
    <div className={styles.header_wrapper}>
      <div className={generalStyles.container}>
        <header className={styles.header}>
          <Link to={'/'} className={styles.logo}>
            Superheroes DB
          </Link>

          {shouldShowAddLink && (
            <Link
              to={'/add'}
              className={styles.add_button}
            >
              Add New
            </Link>
          )}
        </header>
      </div>
    </div>
  );
};