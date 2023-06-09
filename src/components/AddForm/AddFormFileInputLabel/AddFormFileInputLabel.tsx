import styles from './AddFormFileInputLabel.module.scss';

type AddFormFileInputLabelProps = {
  text: string;
  children: React.ReactNode;
};

export const AddFormFileInputLabel = ({
  text,
  children,
}: AddFormFileInputLabelProps) => {
  return (
    <div className={styles.images_upload_container}>
      {text}
      {children}
    </div>
  );
};