import axios from "axios";

export const get = async <T>(path: string, body?: any): Promise<T> => {
  const { data, status } = await axios.get<T>(path, { ...body });

  if (status !== 200) {
    throw new Error();
  }

  return data;
};

export const post = async <T>(path: string, body?: any): Promise<T> => {
  const { data, status } = await axios.post<T>(
    path,
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  if (status !== 201) {
    throw new Error();
  }

  return data;
};

export const patch = async<T>(path: string, body?: any): Promise<T> => {
  const { data, status } = await axios.patch<T>(
    path,
    body,
  );

  if (status !== 200) {
    throw new Error();
  }

  return data;
};

export const remove = async <T>(path: string): Promise<T> => {
  const { data, status } = await axios.delete(path);

  if (status !== 200) {
    throw new Error();
  }

  return data;
};