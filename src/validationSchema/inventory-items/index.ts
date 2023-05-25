import * as yup from 'yup';

export const inventoryItemsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup.number().integer().required(),
  unit: yup.string().required(),
  restaurant_id: yup.string().nullable(),
});
