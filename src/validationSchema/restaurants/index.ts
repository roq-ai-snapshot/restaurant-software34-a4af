import * as yup from 'yup';
import { favoritesValidationSchema } from 'validationSchema/favorites';
import { inventoryItemsValidationSchema } from 'validationSchema/inventory-items';
import { menusValidationSchema } from 'validationSchema/menus';
import { ordersValidationSchema } from 'validationSchema/orders';
import { staffMembersValidationSchema } from 'validationSchema/staff-members';

export const restaurantsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  contact_information: yup.string().required(),
  operating_hours: yup.string().required(),
  owner_id: yup.string().nullable(),
  favorites: yup.array().of(favoritesValidationSchema),
  inventory_items: yup.array().of(inventoryItemsValidationSchema),
  menus: yup.array().of(menusValidationSchema),
  orders: yup.array().of(ordersValidationSchema),
  staff_members: yup.array().of(staffMembersValidationSchema),
});
