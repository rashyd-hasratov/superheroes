import { Superhero } from "../types/Superhero";
import { get, post, patch, remove } from './fetchers';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

type SuperheroPostData = {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: File[];
};

type SuperheroPatchData = {
  nickname: string;
  dataToUpdate: Partial<Superhero>;
};

type PhotoPostData = {
  nickname: string;
  image: File;
};

export const getSuperheroes = (
  page?: number,
) => {
  let query = '';

  if (page) query = `page=${page}`;

  return get<Superhero[]>(
    `${API_BASE_URL}${query ? `?${query}` : ''}`,
  );
};

export const getSuperhero = (nickname: string) => {
  return get<Superhero>(
    `${API_BASE_URL}/${nickname}`,
  );
};

export const getSuperheroesCount = () => {
  return get<{ count: number }>(`${API_BASE_URL}/count`);
};

export const postSuperhero = (postData: SuperheroPostData) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images,
  } = postData;

  const formData = new FormData();

  formData.append('nickname', nickname);
  formData.append('real_name', real_name);
  formData.append('origin_description', origin_description);
  formData.append('superpowers', superpowers);
  formData.append('catch_phrase', catch_phrase);

  images.forEach((image, index) => {
    formData.append(`image_${index + 1}`, image);
  });

  return post<Superhero>(`${API_BASE_URL}/add`, formData);
};

export const postPhoto = (photoPostData: PhotoPostData) => {
  const formData = new FormData();

  formData.append('image', photoPostData.image);

  return post<Superhero>(`${API_BASE_URL}/${photoPostData.nickname}/new-photo`, formData);
}

export const patchSuperhero = (patchData: SuperheroPatchData) => {
  console.log(patchData);

  return patch<Superhero>(`${API_BASE_URL}/${patchData.nickname}`, patchData.dataToUpdate);
}

export const removeSuperhero = (nickname: string) => {
  return remove<Superhero>(`${API_BASE_URL}/${nickname}`);
};
