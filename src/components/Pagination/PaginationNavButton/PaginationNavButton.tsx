import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { PaginationNavButtonType } from '../PaginationNavButtonType';

import styles from './PaginationNavButton.module.scss';

type PaginationNavButtonProps = {
  type: PaginationNavButtonType,
  totalPages: number,
  selectPage: (pageTitle: string) => void, 
};

export const PaginationNavButton = ({
  type,
  totalPages,
  selectPage,
}: PaginationNavButtonProps) => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const isPrevious = type === PaginationNavButtonType.Previous;

  const isDisabled = isPrevious
    ? page === 1 : page === totalPages;

  const handleClick = () => {
    const newPage = isPrevious
      ? page - 1 : page + 1;

    selectPage(String(newPage));
  };

  return (
    <button
      className={classNames(
        styles.pagination_nav_button,
        { [styles.pagination_nav_button_disabled]: isDisabled },
        { [styles.pagination_nav_button_prev_icon]: isPrevious },
        { [styles.pagination_nav_button_next_icon]: !isPrevious },
      )}
      disabled={isDisabled}
      onClick={handleClick}
    />
  );
};