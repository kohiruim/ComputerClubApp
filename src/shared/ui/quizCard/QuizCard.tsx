import { Card, Image, Text, AspectRatio, Button, Flex } from "@mantine/core";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import type { QuizData } from "@/shared";
import { MdOutlineQuiz } from "react-icons/md";

const classes = {
  card: {
    padding: "0px 0px 0px 0px",
    background: "#f8f8f8",
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: "0 10px 20px rgba(0,0,0,.12)",
    },
  },
};

export const QuizCard: FC<{ card: QuizData }> = ({ card }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { id, title, questions, time, image } = card;

  const { t } = useTranslation();

  const handleLoadImage = () => {
    setIsLoaded(true);
  };

  return (
    <Card
      key={id}
      radius="md"
      component="a"
      href="#"
      pos={"relative"}
      m={"0 auto"}
      style={classes.card}
      w={"100%"}
      maw={360}
      p={0}
      bg={"#f8f8f8"}
    >
      <AspectRatio ratio={1920 / 1080} pos={"relative"} w={"100%"}>
        {image && (
          <Image
            src={image}
            fit="cover"
            pos={"absolute"}
            alt={title}
            top={0}
            left={0}
            right={0}
            bottom={0}
            onLoad={handleLoadImage}
          />
        )}

        <MdOutlineQuiz
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: "rgb(248, 248, 248)",
            opacity: isLoaded ? 0 : 1,
          }}
        />
      </AspectRatio>
      <Flex direction={"column"} w={"100%"} h={"100%"} p={"md"}>
        <Text mt={5} fw={700} ff={"Greycliff CF, sans-serif"}>
          {title}
        </Text>
        <Text c="dimmed" size="xs" lineClamp={4} fw={700} mt="md">
          {t("Questions")}: {questions.length}
        </Text>
        <Text c="dimmed" size="xs" lineClamp={4} fw={700} mt="md" mb="auto">
          {t("Test time")}: {time || t("Not specified")} {time && t("min")}
        </Text>
        <Button variant="dark" color="indigo" mt="md">
          {t("Take the quiz")}
        </Button>
      </Flex>
    </Card>
  );
};
