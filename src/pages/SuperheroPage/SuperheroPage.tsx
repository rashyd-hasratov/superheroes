import { Link, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import classNames from 'classnames';

import { getSuperhero, removeSuperhero } from '../../api/requests';

import styles from './SuperheroPage.module.scss';
import generalStyles from '../../styles/General.module.scss';
import { ImageSlider } from '../../components/ImageSlider';

export const SuperheroPage = () => {
  const { pathname } = useLocation();
  const nicknameFormatted = pathname.slice(1);

  const superheroQuery = useQuery({
    queryKey: ['superhero', nicknameFormatted],
    queryFn: () => getSuperhero(nicknameFormatted),
  });

  const superhero = superheroQuery.data;

  const handleDelete = () => {
    removeSuperhero(nicknameFormatted)
      .then(({ nickname }) => console.log(`${nickname} was deleted from the DB!`))
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header_wrapper}>
        <div className={generalStyles.content}>
          <header className={styles.header}>
            <Link to={'/'} className={styles.logo}>
              Superheroes DB
            </Link>

            <Link
              to={'/add'}
              className={styles.add_button}
            >
              Add New
            </Link>
          </header>
        </div>
      </div>

      <div className={styles.main_wrapper}>
        <div className={generalStyles.content}>
          <div className={styles.superhero_info}>
            <ImageSlider productImages={superhero?.images || []}/>
            <div className={styles.description}>
              <h1 className={styles.title}>
                {superhero?.nickname}
              </h1>

              <div className={styles.description_item}>
                <h2 className={styles.description_item_title}>
                  Real Name
                </h2>

                <p className={styles.description_item_value}>
                  {superhero?.real_name}
                </p>
              </div>

              <div className={styles.description_item}>
                <h2 className={styles.description_item_title}>
                  Origin Description
                </h2>

                <p className={styles.description_item_value}>
                  {superhero?.origin_description}
                </p>
              </div>

              <div className={styles.description_item}>
                <h2 className={styles.description_item_title}>
                  Superpowers
                </h2>

                <p className={styles.description_item_value}>
                  {superhero?.superpowers}
                </p>
              </div>

              <div className={styles.description_item}>
                <h2 className={styles.description_item_title}>
                  Catch Phrase
                </h2>

                <p className={styles.description_item_value}>
                  {superhero?.catch_phrase}
                </p>
              </div>
            </div>
          </div>

          <ul className={styles.actions}>
            <li>
              <Link
                to={`/${nicknameFormatted}/edit`}
                className={classNames(
                  styles.actions_button,
                  styles.actions_button_edit,
                )}
              >
                Edit
              </Link>
            </li>

            <li>
              <button
                className={classNames(
                  styles.actions_button,
                  styles.actions_button_delete,
                )}
                onClick={handleDelete}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footer_wrapper}>
        <div className={generalStyles.content}>
          <footer className={styles.footer}>
            Developed with love
          </footer>
        </div>
      </div>
    </div>
  );
};