import { PaginationBullet } from '../PaginationBullet';
import styles from './PaginationBullets.module.scss';

type PaginationBulletsProps = {
  visibleTitles: number[],
  selectPage: (pageTitle: string) => void,
};

export const PaginationBullets = ({
  visibleTitles,
  selectPage
}: PaginationBulletsProps) => {
  return (
    <div className={styles.pagination_bullets}>
      {visibleTitles.map(bulletTitle => (
        <PaginationBullet
          key={bulletTitle}
          bulletTitle={bulletTitle}
          selectPage={selectPage}
        />
      ))}
    </div>
  );
};