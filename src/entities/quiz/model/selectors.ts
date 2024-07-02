import type { RootState } from "@/shared";

export const selectQuizzesList = (state: RootState) =>
  state.quizSlice.quizzesList;

export const selectIsLoadingQuizzesList = (state: RootState) =>
  state.quizSlice.isLoading;
