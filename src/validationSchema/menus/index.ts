import * as yup from 'yup';
import { menuItemsValidationSchema } from 'validationSchema/menu-items';

export const menusValidationSchema = yup.object().shape({
  restaurant_id: yup.string().nullable(),
  menu_items: yup.array().of(menuItemsValidationSchema),
});
