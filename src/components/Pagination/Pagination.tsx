import { useSearchParams } from 'react-router-dom';

import { PaginationNavButton } from './PaginationNavButton';
import { PaginationNavButtonType } from './PaginationNavButtonType';
import { PaginationBullets } from './PaginationBullets';

import styles from './Pagination.module.scss';

const DEFALUT_PAGE_TITLE = '1';

const getBulletsTitles = (quantity: number) => {
  const bulletsTitles = [];

  for (let i = 0; i < quantity; i++) {
    bulletsTitles.push(i + 1);
  }

  return bulletsTitles;
};

const getVisibleBulletsTitles = (
  currentPage: number,
  allBulletsTitles: number[],
) => {
  if (currentPage <= 3) {
    return allBulletsTitles.splice(0, 4);
  }

  if (currentPage > allBulletsTitles.length - 4) {
    return allBulletsTitles.slice(-4);
  }

  return allBulletsTitles.slice(currentPage - 2, currentPage + 2);
};

type PaginationProps = {
  quantity: number,
};

export const Pagination = ({ quantity }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const bulletsTitles = getBulletsTitles(quantity);
  const visibleTitles = getVisibleBulletsTitles(page, bulletsTitles);

  const selectPage = (pageTitle: string) => {
    if (pageTitle === DEFALUT_PAGE_TITLE) {
      searchParams.delete('page');
    } else {
      searchParams.set('page', pageTitle);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={styles.pagination}>
      <PaginationNavButton
        type={PaginationNavButtonType.Previous}
        totalPages={quantity}
        selectPage={selectPage}
      />

      <PaginationBullets
        visibleTitles={visibleTitles}
        selectPage={selectPage}
      />

      <PaginationNavButton
        type={PaginationNavButtonType.Next}
        totalPages={quantity}
        selectPage={selectPage}
      />
    </div>
  );
};