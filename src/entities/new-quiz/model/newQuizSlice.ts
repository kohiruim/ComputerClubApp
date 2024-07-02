import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { type QuizData, db, showErrorMessage, storage } from "@/shared";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

type NewQuizState = {
  isError: string;
  isLoading: boolean;
};

const initialState: NewQuizState = {
  isError: "",
  isLoading: false,
};

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

const addQuizToDataBase = async (quiz: QuizData) => {
  try {
    const quizDocRef = doc(db, "quizzes", quiz.id);
    await setDoc(quizDocRef, quiz);
    return;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        showErrorMessage(`Error in addQuizToDataBase: ${error.message}`)
      );
    }
    throw new Error(
      showErrorMessage("Unknown error occurred in addQuizToDataBase")
    );
  }
};

export const addQuiz = createAsyncThunk(
  "newQuizReducer/addQuiz",
  async (values: Values, { rejectWithValue }) => {
    try {
      const { title, time, image } = values;
      const path = await addImageToStorage(image);
      const quiz: QuizData = {
        title,
        time,
        image: path,
        questions: [],
        id: uuidv4(),
      };
      await addQuizToDataBase(quiz);
      return;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(
          showErrorMessage(`Error in addQuiz: ${error.message}`)
        );
      }
      return rejectWithValue(
        showErrorMessage("Unknown error occurred in addQuiz")
      );
    }
  }
);

const isNewQuizThunkPending = isPending(addQuiz);

const handlePending = (state: NewQuizState, action: UnknownAction) => {
  if (isNewQuizThunkPending(action)) {
    state.isLoading = true;
    state.isError = "";
  }
};

const isNewQuizThunkRejected = isRejected(addQuiz);

const handleRejected = (state: NewQuizState, action: UnknownAction) => {
  if (isNewQuizThunkRejected(action)) {
    state.isLoading = false;
    state.isError =
      typeof action.payload === "string" ? action.payload : "unknown error";
  }
};

const newQuizSlice = createSlice({
  name: "newQuizReducer",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addQuiz.pending, handlePending);
    builder.addCase(addQuiz.rejected, handleRejected);
    builder.addCase(addQuiz.fulfilled, state => {
      state.isLoading = false;
    });
  },
});

export const newQuizReducer = newQuizSlice.reducer;
