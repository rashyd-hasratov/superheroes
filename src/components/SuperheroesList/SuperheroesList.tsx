import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import {
  getSuperheroes,
  getSuperheroesCount,
} from '../../api/requests';
import { SuperheroCard } from '../SuperheroCard/SuperheroCard';
import { Pagination } from '../Pagination';

import styles from './SuperheroesList.module.scss';
import generalStyles from '../../styles/General.module.scss';

export const SuperheroesList = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));

  const superheroesQuery = useQuery({
    queryKey: ['superheroes', page],
    queryFn: () => getSuperheroes(page),
  });

  const superheroesCountQuery = useQuery({
    queryKey: ['superheroesCount'],
    queryFn: () => getSuperheroesCount(),
  });

  const superheroes = superheroesQuery.data || [];
  const superheroesCount = Number(superheroesCountQuery.data?.count);
  const pagesCount = Math.ceil(superheroesCount / 5);

  if (superheroesQuery.isLoading) {
    return <p className={styles.loading_text}>Loading...</p>
  }

  return (
    <div className={generalStyles.content}>
      <div className={styles.list}>
        {superheroes.map(superhero => {
          return (
            <SuperheroCard
              key={superhero.nickname}
              superhero={superhero}
            />
          );
        })}
      </div>
      
      {pagesCount > 1 && <Pagination quantity={pagesCount} />}
    </div>
  );
};