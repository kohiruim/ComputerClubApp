import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type QuizData, db } from "@/shared";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { notifications } from "@mantine/notifications";

type QuizList = {
  quizzes: Array<QuizData>;
  totalCount: number;
  limit: number;
};

type QuizState = {
  quizzesList: QuizList;
  error: string;
  isLoading: boolean;
};

const initialState: QuizState = {
  quizzesList: {
    quizzes: [],
    totalCount: 0,
    limit: 6,
  },
  error: "",
  isLoading: false,
};

const setError = (
  state: QuizState,
  action?: PayloadAction<string | undefined>
) => {
  const errorMessage = action?.payload ?? "unknown error";
  if (!state.error) {
    state.isLoading = false;
    state.error = errorMessage;
    notifications.show({ message: state.error, color: "violet" });
  }
};

const resetStateError = (state: QuizState) => {
  state.isLoading = true;
  state.error = "";
};

export const modifyQuizInDataBase = createAsyncThunk<
  void,
  { quiz: QuizData; actionType: "add" | "update" },
  { rejectValue: string }
>("quizReducer/modifyQuizInDataBase", async ({ quiz }, { rejectWithValue }) => {
  try {
    const quizDocRef = doc(db, "quizzes", quiz.id);
    await setDoc(quizDocRef, quiz);
    return;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(`Error in modifyQuizInDataBase: ${error.message}`);
    }
    return rejectWithValue("Unknown error occurred in modifyQuizInDataBase");
  }
});

export const getQuizzesInDataBase = createAsyncThunk<
  Array<QuizData>,
  { itemLimit: number },
  { rejectValue: string }
>(
  "quizReducer/getQuizzesInDataBase",
  async ({ itemLimit }, { rejectWithValue }) => {
    try {
      const quizzesQuery = query(collection(db, "quizzes"), limit(itemLimit));
      const querySnapshot = await getDocs(quizzesQuery);

      const quizzes: Array<QuizData> = [];
      querySnapshot.forEach(doc => {
        quizzes.push(doc.data() as QuizData);
      });
      return quizzes;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(
          `Error in getQuizzesInDataBase: ${error.message}`
        );
      }
      return rejectWithValue("Unknown error occurred in getQuizzesInDataBase");
    }
  }
);

const quizSlice = createSlice({
  name: "quizReducer",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(modifyQuizInDataBase.pending, resetStateError);
    builder.addCase(modifyQuizInDataBase.rejected, setError);
    builder.addCase(modifyQuizInDataBase.fulfilled, state => {
      state.quizzesList.totalCount += 1;
      state.isLoading = false;
    });
    builder.addCase(getQuizzesInDataBase.pending, resetStateError);
    builder.addCase(getQuizzesInDataBase.rejected, setError);
    builder.addCase(getQuizzesInDataBase.fulfilled, (state, action) => {
      state.quizzesList.quizzes = action.payload;
      state.isLoading = false;
    });
  },
});

export const quizReducer = quizSlice.reducer;
