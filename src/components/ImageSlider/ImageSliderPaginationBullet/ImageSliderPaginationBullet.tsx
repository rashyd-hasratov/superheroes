import classNames from 'classnames';

import styles from './ImageSliderPaginationBullet.module.scss';

type ImageSliderPaginationBulletProps = {
  image: string,
  isActive: boolean,
  onClick: () => void,
};

export const ImageSliderPaginationBullet = ({
  image,
  isActive,
  onClick,
}: ImageSliderPaginationBulletProps) => {
  const backgroundStyles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <button
      className={classNames(
        styles.pagination_bullet,
        { [styles.pagination_bullet_active]: isActive },
      )}
      onClick={onClick}
    >
      <div
        className={styles.pagination_bullet_image_container}
        style={backgroundStyles}
      ></div>
    </button>
  );
};