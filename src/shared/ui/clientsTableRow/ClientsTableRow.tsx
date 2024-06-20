import { type UserData, UserRole, Paths } from "@/shared/type";
import { Username, Balance } from "@/shared/ui";
import type { FC } from "react";
import { Table, Badge } from "@mantine/core";
import { type NavigateFunction, useNavigate } from "react-router-dom";

interface Props {
  element: UserData;
}

export const ClientsTableRow: FC<Props> = ({ element }) => {
  const colorBadge = element.role == UserRole.Admin ? "red" : "indigo";
  const navigate: NavigateFunction = useNavigate();
  const { username, ...user } = element;

  const handleRowClick = () => {
    navigate(`${Paths.ClientEdit}/${element.id}`, {
      state: { editableUser: element },
    });
  };

  return (
    <Table.Tr key={element.id} onClick={handleRowClick}>
      <Table.Td>
        <Username user={user} size="medium" />
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={colorBadge}>
          {element.role}
        </Badge>
      </Table.Td>
      <Table.Td>{username}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>
        <Balance balance={element.balance}></Balance>
      </Table.Td>
    </Table.Tr>
  );
};
