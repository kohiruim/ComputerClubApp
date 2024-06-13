import { Paper, Text } from "@mantine/core";
import { useLocation } from "react-router-dom";
import type { UserData } from "@/shared/type";
import { useTranslation } from "react-i18next";
import { ClientEditForm } from "@/features/editClient";

type LocationState = {
  editableUser: UserData;
};

export const ClientEditPage = () => {
  const location = useLocation();
  const state: LocationState = location.state as LocationState;
  const user: UserData = state.editableUser;
  const { t } = useTranslation();

  return (
    <Paper
      shadow="md"
      radius="md"
      withBorder
      p="xl"
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <Text ta="center" size="lg" lh="lg" mb="xl">
        {t("client editing")}
      </Text>
      <ClientEditForm user={user} />
    </Paper>
  );
};
