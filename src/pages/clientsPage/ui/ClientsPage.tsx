import { Title, Container, Group, Text } from "@mantine/core";
import { ClientsTable } from "@/features/clientsTable";
import { AddClientButton } from "@/features/addClient";
import { SearchClientsForm } from "@/features/searchClients";
import { useAppSelector } from "@/shared/lib";
import { LoadButton } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { selectTotalUsers } from "@/entities/user";

export const ClientsPage = () => {
  const { t } = useTranslation();
  const totalcountUsers = useAppSelector(selectTotalUsers);

  return (
    <main>
      <Container size="xl" pt="xl">
        <Title order={2} mb="lg">
          {t("clients")}
        </Title>
        <Group justify="space-between" mb="lg">
          <Text>
            {t("total")}: {totalcountUsers}
          </Text>
          <AddClientButton />
        </Group>
        <SearchClientsForm />
        <ClientsTable />
        <Group justify="center" m="lg">
          <LoadButton />
        </Group>
      </Container>
    </main>
  );
};
