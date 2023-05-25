import * as yup from 'yup';
import { favoritesValidationSchema } from 'validationSchema/favorites';
import { notificationsValidationSchema } from 'validationSchema/notifications';
import { ordersValidationSchema } from 'validationSchema/orders';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';
import { staffMembersValidationSchema } from 'validationSchema/staff-members';

export const usersValidationSchema = yup.object().shape({
  role: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  favorites: yup.array().of(favoritesValidationSchema),
  notifications: yup.array().of(notificationsValidationSchema),
  orders: yup.array().of(ordersValidationSchema),
  restaurants: yup.array().of(restaurantsValidationSchema),
  staff_members: yup.array().of(staffMembersValidationSchema),
});
