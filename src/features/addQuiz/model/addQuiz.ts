import { notifications } from "@mantine/notifications";
import { type AppDispatch, type QuizData, storage } from "@/shared";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { modifyQuizInDataBase, getQuizzesInDataBase } from "@/entities";

interface Values {
  title: string;
  time: string;
  image: File | null;
}

const addImageToStorage = async (image: File | null) => {
  if (!image) return "";
  try {
    const storageRef = ref(storage, `quiz/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return "Unknown error occurred in addImageToStorage";
  }
};

export const addQuiz = async (
  values: Values,
  dispatch: AppDispatch,
  closeModal: () => void
): Promise<void> => {
  try {
    const { title, time, image } = values;
    const imagePath = await addImageToStorage(image);
    const quiz: QuizData = {
      title,
      time,
      image: imagePath,
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
