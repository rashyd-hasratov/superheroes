import { Superhero } from "../types/Superhero";
import { API_BASE_URL } from '../constants';
import { get, post, remove } from './fetchers';

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

export const postSuperhero = (
  nickname: string,
  real_name: string,
  origin_description: string,
  superpowers: string,
  catch_phrase: string,
  images: File[],
) => {
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

export const removeSuperhero = (nickname: string) => {
  return remove<Superhero>(`${API_BASE_URL}/${nickname}`);
};
