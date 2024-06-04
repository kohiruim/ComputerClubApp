import { Table } from "@mantine/core";
import {
  type UserData,
  ClientsTableRow,
  firebaseKeys,
  headerItems,
  ButtonSort,
  useSortedData,
  useAppSelector,
  type KeysUserData,
} from "@/shared";
import { useTranslation } from "react-i18next";

export const ClientsTable = () => {
  const { t } = useTranslation();
  const { direction, setItem, setDirection } = useSortedData();
  const users: Array<UserData> = useAppSelector(
    state => state.userSlice.clientsTable.users
  );

  const headerHandleClick = (item: KeysUserData | undefined) => {
    return () => {
      if (direction === "asc") {
        setDirection("desc");
      } else {
        setDirection("asc");
      }
      item && setItem(item);
    };
  };

  return (
    <Table highlightOnHover verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          {headerItems.map(item => (
            <Table.Th key={item}>
              {t(item)}
              <ButtonSort
                direction={direction}
                onClick={headerHandleClick(firebaseKeys[item])}
              />
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((item: UserData) => (
          <ClientsTableRow element={item} key={item.id} />
        ))}
      </Table.Tbody>
    </Table>
  );
};
