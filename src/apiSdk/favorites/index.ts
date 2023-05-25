import axios from 'axios';
import queryString from 'query-string';
import { FavoritesInterface } from 'interfaces/favorites';
import { GetQueryInterface } from '../../interfaces';

export const getFavorites = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/favorites${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFavorites = async (favorites: FavoritesInterface) => {
  const response = await axios.post('/api/favorites', favorites);
  return response.data;
};

export const updateFavoritesById = async (id: string, favorites: FavoritesInterface) => {
  const response = await axios.put(`/api/favorites/${id}`, favorites);
  return response.data;
};

export const getFavoritesById = async (id: string) => {
  const response = await axios.get(`/api/favorites/${id}`);
  return response.data;
};
