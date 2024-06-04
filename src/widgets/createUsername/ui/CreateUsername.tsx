import { Paper, Text } from "@mantine/core";
import { UsernameForm } from "@/features";
import { useTranslation } from "react-i18next";

export const CreateUsername = () => {
  const { t } = useTranslation();
  return (
    <Paper shadow="md" radius="md" withBorder p="xl" className="w-80">
      <Text ta="center" size="lg" lh="lg" mb="xl">
        {t("create username")}
      </Text>
      <UsernameForm />
    </Paper>
  );
};
