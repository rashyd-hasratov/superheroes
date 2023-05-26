import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import styles from './PaginationBullet.module.scss';

type PaginationBulletProps = {
  bulletTitle: number,
  selectPage: (pageTitle: string) => void,
};

export const PaginationBullet = ({
  bulletTitle,
  selectPage,
}: PaginationBulletProps) => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  return (
    <button
      key={bulletTitle}
      className={classNames(
        styles.pagination_bullet,
        { [styles.pagination_bullet_active]: bulletTitle === page}
      )}
      onClick={() => selectPage(String(bulletTitle))}
    >
      {bulletTitle}
    </button>
  );
};