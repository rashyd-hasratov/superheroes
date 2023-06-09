import styles from './AddFormFileInput.module.scss';

type AddFormFileInputProps = {
  image: File | null,
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

export const AddFormFileInput = ({
  image,
  onUpload,
}: AddFormFileInputProps) => {
  return (
    <div className={styles.image_upload}>
      <label className={styles.file_input_label}>
        {image ? image.name : 'Upload an image' }

          <input
            type="file"
            className={styles.file_input}
            onChange={onUpload}
          />
      </label>
    </div>
  );
};