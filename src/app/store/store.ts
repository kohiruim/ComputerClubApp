import { configureStore } from "@reduxjs/toolkit";
import { userReduser, quizReducer } from "@/entities";

export const store = configureStore({
  reducer: {
    userSlice: userReduser,
    quizSlice: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
