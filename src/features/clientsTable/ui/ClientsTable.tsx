import { Table } from "@mantine/core";
import { useSortedData, useAppSelector } from "@/shared/lib";
import type { KeysUserData, UserData } from "@/shared/type";
import { firebaseKeys, headerItems } from "@/shared/config";
import { ButtonSort, ClientsTableRow } from "@/shared/ui";
import { selectUsers } from "@/entities/user";
import { useTranslation } from "react-i18next";

export const ClientsTable = () => {
  const { t } = useTranslation();
  const { direction, setSortedItem, setDirection } = useSortedData();
  const users: Array<UserData> = useAppSelector(selectUsers);

  const headerHandleClick = (item: KeysUserData | undefined) => {
    return () => {
      if (direction === "asc") {
        setDirection("desc");
      } else {
        setDirection("asc");
      }
      item && setSortedItem(item);
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
