import styles from './ImageSlide.module.scss';

type ImageSlideProps = {
  image: string,
};

export const ImageSlide = ({ image }: ImageSlideProps) => {
  const backgroundStyles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className={styles.slide} style={backgroundStyles}></div>
  );
};