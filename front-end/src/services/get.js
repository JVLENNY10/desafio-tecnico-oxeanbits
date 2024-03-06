import api from './api';

export const getFilms = () => api.get(`top_rated?${process.env.REACT_APP_API_KEY}`)
  .then((res) => res.data)
  .catch((error) => console.error(error));
