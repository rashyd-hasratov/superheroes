import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  getSuperhero,
  patchSuperhero,
  postPhoto,
  removeSuperhero,
} from '../../api/requests';
import { NotificationType } from '../../types/NotificationType';
import { NotificationContext } from '../../contexts/NotificationContext';
import { ImageSlider } from '../../components/ImageSlider';
import { SuperheroInfoItem } from '../../components/SuperheroInfoItem';
import { SuperheroInfoHeader } from '../../components/SuperheroInfoHeader';
import { SuperheroImagesSettings } from '../../components/SuperheroImagesSettings';

import styles from './SuperheroPage.module.scss';

export const SuperheroPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const nicknameFormatted = pathname.slice(1);

  const { showNotification } = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const superheroQuery = useQuery({
    queryKey: ['superhero', nicknameFormatted],
    queryFn: () => getSuperhero(nicknameFormatted),
    retry: false,
    onError: () => showNotification(
      'Unable to load data',
      NotificationType.DANGER,
    ),
  });

  const createSuperheroDeleteMutation = useMutation({
    mutationFn: removeSuperhero,
    onSuccess: () => {
      showNotification('Deleted!', NotificationType.SUCCESS);
      navigate('/');
    },
    onError: () => {
      showNotification('Unable to delete', NotificationType.DANGER);
    },
  });

  const createSuperheroUpdateMutation = useMutation({
    mutationFn: patchSuperhero,
    onSuccess: (data) => {
      showNotification('Saved!', NotificationType.SUCCESS);
      queryClient.setQueryData(['superhero', nicknameFormatted], data);
    },
    onError: (err) => {
      console.log(err);
      showNotification('Unable to update', NotificationType.DANGER);
    },
  });

  const createPhotoUploadMutation = useMutation({
    mutationFn: postPhoto,
    onSuccess: (data) => {
      queryClient.setQueryData(['superhero', nicknameFormatted], data);
    },
    onError: () => {
      showNotification('Unable to upload photo', NotificationType.DANGER);
    },
  });

  const superhero = superheroQuery.data;

  const handleDelete = () => {
    createSuperheroDeleteMutation.mutate(nicknameFormatted);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      createPhotoUploadMutation.mutate({
        nickname: nicknameFormatted,
        image: files[0],
      });
    }
  }

  const updateByKey = (key: string, value: string | string[]) => {
    const dataToUpdate = {
      [key]: value,
    };

    createSuperheroUpdateMutation.mutate({
      nickname: nicknameFormatted,
      dataToUpdate,
    });
  };

  if (superheroQuery.isLoading) {
    return <p className={styles.loading_text}>Loading...</p>
  }

  if (superheroQuery.isError) {
    return (
      <button
        className={styles.reload_button}
        onClick={() => superheroQuery.refetch()}
      >
        Reload
      </button>
    );
  }

  return (
    <>
      <div className={styles.superhero}>
        <ImageSlider productImages={superhero?.images || []}/>

        <div className={styles.info}>
          <SuperheroInfoHeader
            title={superhero?.nickname as string}
            onSuperheroDelete={handleDelete}
          />

          <SuperheroInfoItem
            property='real_name'
            value={superhero?.real_name as string}
            onUpdate={updateByKey} 
          />

          <SuperheroInfoItem
            property='origin_description'
            value={superhero?.origin_description as string}
            onUpdate={updateByKey} 
          />

          <SuperheroInfoItem
            property='superpowers'
            value={superhero?.superpowers as string}
            onUpdate={updateByKey} 
          />

          <SuperheroInfoItem
            property='catch_phrase'
            value={superhero?.catch_phrase as string}
            onUpdate={updateByKey} 
          />

          <SuperheroImagesSettings
            images={superhero?.images as string[]}
            onImageUpload={handleImageUpload}
            onUpdate={updateByKey}
          />
        </div>
      </div>

      <button
        className={styles.delete_button}
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  );
};