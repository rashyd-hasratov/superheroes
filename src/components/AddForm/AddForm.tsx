import { useState, useContext } from 'react';
import { useMutation } from 'react-query';

import { postSuperhero } from '../../api/requests';
import { AddFormTextInput } from './AddFormTextInput';
import { AddFormFileInputLabel } from './AddFormFileInputLabel';
import { AddFormFileInput } from './AddFormFileInput';
import { NotificationType } from '../../types/NotificationType';
import { NotificationContext } from '../../contexts/NotificationContext';

import styles from './AddForm.module.scss';

type AddFormProps = {
  afterSubmit: () => void;
};

export const AddForm = ({ afterSubmit }: AddFormProps) => {
  const { showNotification } = useContext(NotificationContext);
  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');
  const [originDescription, setOriginDescription] = useState('');
  const [superpowers, setSuperpowers] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);

  const createSuperheroPostMutation = useMutation({
    mutationFn: postSuperhero,
    onSuccess: () => showNotification(
      'Added!',
      NotificationType.SUCCESS,
    ),
    onError: () => showNotification(
      'Something went wrong',
      NotificationType.DANGER,
    ),
  });

  const { isLoading } = createSuperheroPostMutation;

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

  const handleImage1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      setImage1(files[0]);
    };
  }

  const handleImage2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      setImage2(files[0]);
    };
  }

  const handleImage3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      setImage3(files[0]);
    };
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const images = [image1, image2, image3].filter(image => (
      image !== null
    ));

    const postData = {
      nickname,
      real_name: realName,
      origin_description: originDescription,
      superpowers,
      catch_phrase: catchPhrase,
      images: images as File[],
    };

    createSuperheroPostMutation.mutate(postData);

    setNickname('');
    setRealName('');
    setOriginDescription('');
    setSuperpowers('');
    setCatchPhrase('');
    setImage1(null);
    setImage2(null);
    setImage3(null);
  };

  return (
    <form
      className={styles.form}
      encType="multipart/form-data"
      onSubmit={handleFormSubmit}
    >
      <AddFormTextInput
        name='Nickname'
        value={nickname}
        onChange={handleNicknameChange}
      />

      <AddFormTextInput
        name='Real Name'
        value={realName}
        onChange={handleRealNameChange}
      />

      <AddFormTextInput
        name='Origin Description'
        value={originDescription}
        onChange={handleOriginDescriptionChange}
      />

      <AddFormTextInput
        name='Superpowers'
        value={superpowers}
        onChange={handleSuperpowersChange}
      />

      <AddFormTextInput
        name='Catch Phrase'
        value={catchPhrase}
        onChange={handleCatchPhraseChange}
      />

      <AddFormFileInputLabel text='Images'>
        <AddFormFileInput
          image={image1}
          onUpload={handleImage1Change}
        />

        <AddFormFileInput
          image={image2}
          onUpload={handleImage2Change}
        />

        <AddFormFileInput
          image={image3}
          onUpload={handleImage3Change}
        />
      </AddFormFileInputLabel>

      <button
        type="submit"
        className={styles.submit_button}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};