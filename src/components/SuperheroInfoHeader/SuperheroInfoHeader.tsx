import styles from './SuperheroInfoHeader.module.scss';

type SuperheroInfoHeaderProps = {
  title: string
  onSuperheroDelete: () => void,
}

export const SuperheroInfoHeader = ({
  title,
  onSuperheroDelete,
}: SuperheroInfoHeaderProps) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {title}
      </h1>

      <button
        className={styles.delete_button}
        onClick={onSuperheroDelete}
      />
    </div>
  );
}