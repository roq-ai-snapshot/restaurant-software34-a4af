import axios from 'axios';
import queryString from 'query-string';
import { InventoryItemsInterface } from 'interfaces/inventory-items';
import { GetQueryInterface } from '../../interfaces';

export const getInventoryItems = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/inventory-items${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInventoryItems = async (inventoryItems: InventoryItemsInterface) => {
  const response = await axios.post('/api/inventory-items', inventoryItems);
  return response.data;
};

export const updateInventoryItemsById = async (id: string, inventoryItems: InventoryItemsInterface) => {
  const response = await axios.put(`/api/inventory-items/${id}`, inventoryItems);
  return response.data;
};

export const getInventoryItemsById = async (id: string) => {
  const response = await axios.get(`/api/inventory-items/${id}`);
  return response.data;
};
