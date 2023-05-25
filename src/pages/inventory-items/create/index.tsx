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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createInventoryItems } from 'apiSdk/inventory-items';
import { Error } from 'components/error';
import { InventoryItemsInterface } from 'interfaces/inventory-items';
import { inventoryItemsValidationSchema } from 'validationSchema/inventory-items';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { getRestaurants } from 'apiSdk/restaurants';

function InventoryItemsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InventoryItemsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInventoryItems(values);
      resetForm();
      router.push('/inventory-items');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InventoryItemsInterface>({
    initialValues: {
      name: '',
      quantity: 0,
      unit: '',
      restaurant_id: null,
    },
    validationSchema: inventoryItemsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Inventory Items
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors.name}>
            <FormLabel>Item Name</FormLabel>
            <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="quantity" mb="4" isInvalid={!!formik.errors.quantity}>
            <FormLabel>Quantity</FormLabel>
            <NumberInput
              name="quantity"
              value={formik.values.quantity}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.quantity && <FormErrorMessage>{formik.errors.quantity}</FormErrorMessage>}
          </FormControl>
          <FormControl id="unit" mb="4" isInvalid={!!formik.errors.unit}>
            <FormLabel>Unit</FormLabel>
            <Input type="text" name="unit" value={formik.values.unit} onChange={formik.handleChange} />
            {formik.errors.unit && <FormErrorMessage>{formik.errors.unit}</FormErrorMessage>}
          </FormControl>
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
      </Box>
    </AppLayout>
  );
}

export default InventoryItemsCreatePage;
