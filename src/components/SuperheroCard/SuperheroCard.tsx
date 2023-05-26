import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../constants';
import { Superhero } from '../../types/Superhero';

import styles from './SuperheroCard.module.scss';

type SuperheroCardProps = {
  superhero: Superhero,
};

export const SuperheroCard = ({ superhero }: SuperheroCardProps) => {
  const {
    nickname,
    images,
  } = superhero;

  const formattedNickname = nickname
    .toLowerCase()
    .split(' ')
    .join('-');

  const backgroundStyles = {
    backgroundImage: `url('${API_BASE_URL}/${images[0]}')`,
  };

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.image_container} style={backgroundStyles}></div>

        <h2 className={styles.nickname}>
          {nickname}
        </h2>
      </div>

      <Link
        to={`/${formattedNickname}`}
        className={styles.detailsButton}
      >
        See details
      </Link>
    </div>
  );
};
