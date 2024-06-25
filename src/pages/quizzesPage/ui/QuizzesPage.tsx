import { Container, Title, Flex } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const QuizzesPage = () => {
  const { t } = useTranslation();

  return (
    <Container size="xl" py="xl">
      <Flex justify="space-between">
        <Title order={2} mb="lg">
          {t("Quizzes")}
        </Title>
      </Flex>
    </Container>
  );
};
