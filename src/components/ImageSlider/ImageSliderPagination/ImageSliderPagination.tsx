import { useState } from 'react';
import { Swiper as SwiperClass } from 'swiper/types';

import {
  ImageSliderPaginationBullet,
} from '../ImageSliderPaginationBullet';

import styles from './ImageSliderPagination.module.scss';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

type ImageSliderPaginationProps = {
  images: string[],
  sliderRef: SwiperClass | null,
};

export const ImageSliderPagination = ({
  images,
  sliderRef,
}: ImageSliderPaginationProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  sliderRef?.on('slideChange', () => (
    setActiveSlideIndex(sliderRef.realIndex)
  ));

  return (
    <div className={styles.pagination}>
      {images.map((image, index) => {
        const isActiveBullet = index === activeSlideIndex;
        const onBulletClick = () => (
          sliderRef?.slideTo(index)
        );

        return (
          <ImageSliderPaginationBullet
            key={image}
            image={`${API_BASE_URL}/${image}`}
            isActive={isActiveBullet}
            onClick={onBulletClick}
          />
        );
      })}
    </div>
  );
};