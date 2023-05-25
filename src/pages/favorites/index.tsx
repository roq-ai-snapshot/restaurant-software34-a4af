import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getFavorites } from 'apiSdk/favorites';
import { FavoritesInterface } from 'interfaces/favorites';
import { Error } from 'components/error';

function FavoritesListPage() {
  const { data, error, isLoading } = useSWR<FavoritesInterface[]>(
    () => true,
    () =>
      getFavorites({
        relations: ['users', 'restaurants'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Favorites
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
                  <Th>User</Th>
                  <Th>Restaurant</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>{record.users?.name}</Td>
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
export default FavoritesListPage;
