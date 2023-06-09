import { useState } from 'react';

import styles from './SuperheroInfoItem.module.scss';

const formatPropertyToTitle = (key: string) => {
  return key
    .split('_')
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

type SuperheroInfoItemProps = {
  property: string;
  value: string;
  onUpdate: (key: string, value: string) => void,
};

export const SuperheroInfoItem = ({
  property,
  value,
  onUpdate,
}: SuperheroInfoItemProps) => {
  const [newValue, setNewValue] = useState<string | null>(null);
  const [isInputActive, setIsInputActive] = useState(false);

  const title = formatPropertyToTitle(property);

  const handleEditClick = () => {
    setIsInputActive(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.currentTarget.value);
  };

  const handleUpdate = () => {
    onUpdate(property, newValue as string);

    setIsInputActive(false);
    setNewValue(null);
  };

  return (
    <div className={styles.description_item}>
      <div className={styles.description_item_header}>
        <h2 className={styles.description_item_title}>
          {title}
        </h2>

        <button
          className={styles.edit_button}
          onClick={handleEditClick}
        />
      </div>

      {isInputActive
        ? (
          <input
            type='text'
            value={newValue ?? value}
            onBlur={handleUpdate}
            onChange={handleInputChange}
          />
        )
        : (
          <p className={styles.description_item_value}>
            {value}
          </p>
        )
      }
    </div>
  );
};