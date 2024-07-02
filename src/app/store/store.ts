import { configureStore } from "@reduxjs/toolkit";
import { userReduser, quizReducer, newQuizReducer } from "@/entities";

export const store = configureStore({
  reducer: {
    userSlice: userReduser,
    quizSlice: quizReducer,
    newQuizSlice: newQuizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
