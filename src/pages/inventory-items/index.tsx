import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getInventoryItems } from 'apiSdk/inventory-items';
import { InventoryItemsInterface } from 'interfaces/inventory-items';
import { Error } from 'components/error';

function InventoryItemsListPage() {
  const { data, error, isLoading } = useSWR<InventoryItemsInterface[]>(
    () => true,
    () =>
      getInventoryItems({
        relations: ['restaurants'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Inventory Items
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Quantity</Th>
                  <Th>Unit</Th>
                  <Th>Restaurant</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.name}</Td>
                    <Td>{record.quantity}</Td>
                    <Td>{record.unit}</Td>
                    <Td>{record.restaurants?.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default InventoryItemsListPage;
