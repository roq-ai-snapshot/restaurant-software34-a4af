import * as yup from 'yup';

export const favoritesValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  restaurant_id: yup.string().nullable(),
});
