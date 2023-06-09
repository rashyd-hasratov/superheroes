import { useState } from 'react';

import generalStyles from '../../styles/General.module.scss';
import { AddForm } from '../../components/AddForm';

export const AddPage = () => {
  const [isAdded, setIsAdded] = useState(false);

  const handleSuperheroAddition = () => {
    setIsAdded(true);
  };

  if (isAdded) {
    return (
      <p>The Superhero was successfully added!</p>
    );
  }

  return (
    <>
      <h1 className={generalStyles.page_title}>
        Add New Superhero
      </h1>

      <AddForm afterSubmit={handleSuperheroAddition} />
    </>
  );
}