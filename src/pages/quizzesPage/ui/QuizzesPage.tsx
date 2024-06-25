import { AddQuizButton } from "@/features";
import { UserRole, useAppSelector } from "@/shared";
import { useGetQuizzesData } from "@/shared/lib/hooks/useGetQuizzes";
import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Title,
  Button,
  Flex,
} from "@mantine/core";

const useStyles = () => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: "0 10px 20px rgba(0,0,0,.12)",
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${"sans-serif"}`,
    fontWeight: 700,
  },
});

export const QuizzesPage = () => {
  useGetQuizzesData();
  const role = useAppSelector(state => state.userSlice.currentUser.role);

  const {
    quizzesList: { quizzes },
  } = useAppSelector(state => state.quizSlice);
  const classes = useStyles();

  const cards = quizzes.map(quiz => (
    <Card
      key={quiz.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      style={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        {quiz.image && <Image src={quiz.image} />}
      </AspectRatio>
      <Text style={classes.title} mt={5} fw={500}>
        {quiz.title}
      </Text>
      <Text c="dimmed" size="xs" lineClamp={4} fw={700} mt="md">
        Questions: {quiz.questions.length}
      </Text>
      <Text c="dimmed" size="xs" lineClamp={4} fw={700} mt="md">
        Test time {quiz.time}
      </Text>
      <Button variant="dark" color="indigo" mt="md">
        Take the quiz
      </Button>
    </Card>
  ));

  // const createQuiz = () => {};

  return (
    <Container size="xl" py="xl">
      <Flex justify="space-between">
        <Title order={2} mb="lg">
          Quizzes
        </Title>
        {role === UserRole.Admin && <AddQuizButton />}
      </Flex>

      <SimpleGrid cols={{ base: 1, sm: 4 }}>{...cards}</SimpleGrid>
    </Container>
  );
};
