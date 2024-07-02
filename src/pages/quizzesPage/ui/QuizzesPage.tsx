import {
  selectIsLoadingQuizzesList,
  selectQuizzesList,
  selectUserRole,
} from "@/entities";
import { AddQuizButton } from "@/features";
import {
  LoaderContainer,
  QuizCard,
  UserRole,
  useAppSelector,
  useGetQuizzesData,
} from "@/shared";
import { SimpleGrid, Container, Title, Flex } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const QuizzesPage = () => {
  const { t } = useTranslation();
  useGetQuizzesData();

  const role = useAppSelector(selectUserRole);

  const { quizzes } = useAppSelector(selectQuizzesList);

  const isLoading = useAppSelector(selectIsLoadingQuizzesList);

  const cards = quizzes.map(quiz => <QuizCard key={quiz.id} card={quiz} />);

  return (
    <Container size="xl" py="xl">
      <Flex justify="space-between">
        <Title order={2} mb="lg">
          {t("Quizzes")}
        </Title>
        {role === UserRole.Admin && <AddQuizButton />}
      </Flex>

      <LoaderContainer isFetching={isLoading}>
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
          verticalSpacing={{ base: "lg", xs: "xl", sm: "xl" }}
          spacing={{ base: "md", sm: "xl" }}
        >
          {...cards}
        </SimpleGrid>
      </LoaderContainer>
    </Container>
  );
};
