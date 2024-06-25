import { notifications } from "@mantine/notifications";
import type { AppDispatch, QuizData } from "@/shared";
import { v4 as uuidv4 } from "uuid";
import { modifyQuizInDataBase, getQuizzesInDataBase } from "@/entities";

interface Values {
  title: string;
  time: string;
  image: string;
}

export const addQuiz = async (
  values: Values,
  dispatch: AppDispatch,
  closeModal: () => void
): Promise<void> => {
  try {
    const quiz: QuizData = {
      ...values,
      questions: [],
      id: uuidv4(),
    };
    await dispatch(modifyQuizInDataBase({ quiz, actionType: "add" }));
    await dispatch(getQuizzesInDataBase({ itemLimit: 6 }));
    closeModal();
  } catch (error) {
    if (error instanceof Error) {
      notifications.show({ message: error.message, color: "violet" });
    } else {
      console.error(error);
    }
  }
};
