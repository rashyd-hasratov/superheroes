import styles from './SuperheroImagesSettings.module.scss';

type SuperheroImagesSettingsProps = {
  images: string[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onUpdate: (key: string, value: string[]) => void,
};

export const SuperheroImagesSettings = ({
  images,
  onImageUpload,
  onUpdate,
}: SuperheroImagesSettingsProps) => {
  const deleteImage = (imagePath: string) => {
    const newImagePaths = images.filter(image => image !== imagePath);

    onUpdate('images', newImagePaths as string[]);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settings_header}>
        <h2 className={styles.settings_title}>
          Images
        </h2>

        {images.length < 3 && (
          <div className={styles.image_upload}>
            <label className={styles.image_input_label}>
              <input
                type="file"
                className={styles.image_input}
                onChange={onImageUpload}
              />
            </label>
          </div>
        )}
      </div>

      <div className={styles.images_info}>
        {images.map((image, index) => {
          return (
            <div key={image} className={styles.image_info}>
              <p>
                {`image ${index + 1}`}
              </p>

              <button
                className={styles.delete_image_button}
                onClick={(event) => {
                  event.preventDefault();

                  deleteImage(image);
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};