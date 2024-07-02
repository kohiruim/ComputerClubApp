import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { type QuizData, db, showErrorMessage } from "@/shared";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  limit,
} from "firebase/firestore";

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
    limit: 20,
  },
  error: "",
  isLoading: false,
};

export const getQuizzes = async ({ itemLimit }: { itemLimit: number }) => {
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
      throw new Error(
        showErrorMessage(`Error in getQuizzesInDataBase: ${error.message}`)
      );
    }
    throw new Error(
      showErrorMessage("Unknown error occurred in getQuizzesInDataBase")
    );
  }
};

export const modifyQuizInDataBase = createAsyncThunk(
  "quizReducer/modifyQuizInDataBase",
  async ({ quiz }: { quiz: QuizData }, { rejectWithValue }) => {
    try {
      const quizDocRef = doc(db, "quizzes", quiz.id);
      await setDoc(quizDocRef, quiz);
      return;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(
          showErrorMessage(`Error in modifyQuizInDataBase: ${error.message}`)
        );
      }
      return rejectWithValue(
        showErrorMessage("Unknown error occurred in modifyQuizInDataBase")
      );
    }
  }
);

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
          showErrorMessage(`Error in getQuizzesInDataBase: ${error.message}`)
        );
      }
      return rejectWithValue(
        showErrorMessage("Unknown error occurred in getQuizzesInDataBase")
      );
    }
  }
);

const isQuizzesThunksPending = isPending(
  modifyQuizInDataBase,
  getQuizzesInDataBase
);

const handlePending = (state: QuizState, action: UnknownAction) => {
  if (isQuizzesThunksPending(action)) {
    state.isLoading = true;
    state.error = "";
  }
};

const isQuizzesThunksRejected = isRejected(
  modifyQuizInDataBase,
  getQuizzesInDataBase
);

const handleRejected = (state: QuizState, action: UnknownAction) => {
  if (isQuizzesThunksRejected(action)) {
    state.isLoading = false;
    state.error =
      typeof action.payload === "string" ? action.payload : "unknown error";
  }
};

const quizSlice = createSlice({
  name: "quizReducer",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(modifyQuizInDataBase.pending, handlePending);
    builder.addCase(modifyQuizInDataBase.rejected, handleRejected);
    builder.addCase(modifyQuizInDataBase.fulfilled, state => {
      state.quizzesList.totalCount += 1;
      state.isLoading = false;
    });
    builder.addCase(getQuizzesInDataBase.pending, handlePending);
    builder.addCase(getQuizzesInDataBase.rejected, handleRejected);
    builder.addCase(getQuizzesInDataBase.fulfilled, (state, action) => {
      state.quizzesList.quizzes = action.payload;
      state.isLoading = false;
    });
  },
});

export const quizReducer = quizSlice.reducer;
