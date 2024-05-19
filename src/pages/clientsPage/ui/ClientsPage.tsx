import { Title, Container, Group, Text } from "@mantine/core";
import { ClientsTable, AddClientButton, SearchClientsForm } from "@/features";
import { useAppSelector, LoadButton } from "@/shared";
import { useTranslation } from "react-i18next";

export const ClientsPage = () => {
  const { t } = useTranslation();
  const totalcountUsers = useAppSelector(
    state => state.userSlice.clientsTable.totalCount
  );

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
