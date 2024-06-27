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
import { useTranslation } from "react-i18next";
import { MdOutlineQuiz } from "react-icons/md";

const useStyles = () => ({
  card: {
    maxWidth: 360,
    padding: "0px 0px 0px 0px",
    background: "#f8f8f8",
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
  const { t } = useTranslation();
  useGetQuizzesData();
  const role = useAppSelector(state => state.userSlice.currentUser.role);

  const {
    quizzesList: { quizzes },
  } = useAppSelector(state => state.quizSlice);
  const classes = useStyles();

  const cards = quizzes.map(quiz => (
    <Card
      key={quiz.id}
      radius="md"
      component="a"
      href="#"
      pos={"relative"}
      m={"0 auto"}
      style={classes.card}
    >
      <AspectRatio ratio={1920 / 1080} pos={"relative"} w={"100%"}>
        <MdOutlineQuiz
          style={{ position: "relative", width: "100%", height: "100%" }}
        />
        {quiz.image && (
          <Image
            src={quiz.image}
            fit="cover"
            pos={"absolute"}
            alt={quiz.title}
            top={0}
            left={0}
            right={0}
            bottom={0}
          />
        )}
      </AspectRatio>
      <Flex direction={"column"} w={"100%"} h={"100%"} p={"md"}>
        <Text style={classes.title} mt={5} fw={500}>
          {quiz.title}
        </Text>
        <Text c="dimmed" size="xs" lineClamp={4} fw={700} mt="md">
          {t("Questions")}: {quiz.questions.length}
        </Text>
        <Text c="dimmed" size="xs" lineClamp={4} fw={700} mt="md" mb="auto">
          {t("Test time")}: {quiz.time || t("Not specified")}{" "}
          {quiz.time && t("min")}
        </Text>
        <Button variant="dark" color="indigo" mt="md">
          {t("Take the quiz")}
        </Button>
      </Flex>
    </Card>
  ));

  return (
    <Container size="xl" py="xl">
      <Flex justify="space-between">
        <Title order={2} mb="lg">
          {t("Quizzes")}
        </Title>
        {role === UserRole.Admin && <AddQuizButton />}
      </Flex>

      <SimpleGrid
        cols={{ base: 1, sm: 3, md: 4, lg: 5 }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {...cards}
      </SimpleGrid>
    </Container>
  );
};
