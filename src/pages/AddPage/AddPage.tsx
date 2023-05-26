import { useState } from 'react';
import { Link } from 'react-router-dom';

import { postSuperhero } from '../../api/requests';

import styles from './AddPage.module.scss';
import generalStyles from '../../styles/General.module.scss';

export const AddPage = () => {
  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');
  const [originDescription, setOriginDescription] = useState('');
  const [superpowers, setSuperpowers] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.currentTarget.value);
  };

  const handleRealNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRealName(event.currentTarget.value);
  };

  const handleOriginDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginDescription(event.currentTarget.value);
  };

  const handleSuperpowersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuperpowers(event.currentTarget.value);
  };

  const handleCatchPhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCatchPhrase(event.currentTarget.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const images = [image1, image2, image3].filter(image => (
      image !== null
    ));

    postSuperhero(
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
      images as File[],
    )
      .then(res => {
        console.log(res);
        setIsAdded(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header_wrapper}>
        <div className={generalStyles.content}>
          <header className={styles.header}>
            <Link
              to={'/'}
              className={styles.logo}
            >
              Superheroes DB
            </Link>
          </header>
        </div>
      </div>

      <div className={styles.main_wrapper}>
        <div className={generalStyles.content}>
          <main className={styles.main}>
            {isAdded
              ? (
                <p>The Superhero was successfully added!</p>
              )
              : (
                <>
                  <h1 className={styles.title}>
                    Add New Superhero
                  </h1>

                  <form
                    className={styles.form}
                    encType="multipart/form-data"
                    onSubmit={handleFormSubmit}
                  >
                    <label className={styles.input_label}>
                      Nickname
                      <input
                        type='text'
                        className={styles.input}
                        value={nickname}
                        onChange={handleNicknameChange}
                        required
                      />
                    </label>

                    <label className={styles.input_label}>
                      Real Name
                      <input
                        type='text'
                        className={styles.input}
                        onChange={handleRealNameChange}
                        required
                      />
                    </label>

                    <label className={styles.input_label}>
                      Origin Description
                      <input
                        type='text'
                        className={styles.input}
                        onChange={handleOriginDescriptionChange}
                        required
                      />
                    </label>

                    <label className={styles.input_label}>
                      Superpowers
                      <input
                        type='text'
                        className={styles.input}
                        onChange={handleSuperpowersChange}
                        required
                      />
                    </label>

                    <label className={styles.input_label}>
                      Catch Phrase
                      <input
                        type='text'
                        className={styles.input}
                        onChange={handleCatchPhraseChange}
                        required
                      />
                    </label>

                    <div className={styles.images_upload_container}>
                      Images

                      <div className={styles.image_upload}>
                        <label className={styles.file_input_label}>
                          {image1 ? image1.name : 'Upload an image' }

                          <input
                            type="file"
                            className={styles.file_input}
                            onChange={(e) => {
                              if (e.target.files) {
                                setImage1(e.target.files[0]);
                              };
                            }}
                          />
                        </label>
                      </div>

                      <div className={styles.image_upload}>
                        <label className={styles.file_input_label}>
                          {image2 ? image2.name : 'Upload an image' }

                          <input
                            type="file"
                            className={styles.file_input}
                            onChange={(e) => {
                              if (e.target.files) {
                                setImage2(e.target.files[0]);
                              };
                            }}
                          />
                        </label>
                      </div>

                      <div className={styles.image_upload}>
                        <label className={styles.file_input_label}>
                          {image3 ? image3.name : 'Upload an image' }

                          <input
                            type="file"
                            className={styles.file_input}
                            onChange={(e) => {
                              if (e.target.files) {
                                setImage3(e.target.files[0]);
                              };
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <button type="submit" className={styles.submit_button}>
                      Submit
                    </button>
                  </form>
                </>
              )
            }
          </main>
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
}