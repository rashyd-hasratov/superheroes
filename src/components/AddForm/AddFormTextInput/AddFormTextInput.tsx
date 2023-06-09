import styles from './AddFormTextInput.module.scss';

type AddFormTextInputProps = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const AddFormTextInput = ({
  name,
  value,
  onChange,
}: AddFormTextInputProps) => {
  return (
    <label className={styles.input_label}>
      {name}

      <input
        type='text'
        className={styles.input}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
};