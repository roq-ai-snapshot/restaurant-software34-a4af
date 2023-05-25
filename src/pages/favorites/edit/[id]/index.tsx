import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getFavoritesById, updateFavoritesById } from 'apiSdk/favorites';
import { Error } from 'components/error';
import { favoritesValidationSchema } from 'validationSchema/favorites';
import { FavoritesInterface } from 'interfaces/favorites';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';

function FavoritesEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FavoritesInterface>(id, getFavoritesById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FavoritesInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFavoritesById(id, values);
      mutate(updated);
      resetForm();
      router.push('/favorites');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FavoritesInterface>({
    initialValues: data,
    validationSchema: favoritesValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Favorites
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<UsersInterface>
              formik={formik}
              name={'user_id'}
              label={'User'}
              placeholder={'Select Users'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<RestaurantsInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Restaurant'}
              placeholder={'Select Restaurants'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default FavoritesEditPage;
