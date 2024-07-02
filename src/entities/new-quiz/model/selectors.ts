import type { RootState } from "@/shared/type";

export const selectNewQuiz = (state: RootState) => state.newQuizSlice;
