import * as yup from 'yup';

export const orderItemsValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  customization: yup.string(),
  order_id: yup.string().nullable(),
  menu_item_id: yup.string().nullable(),
});
