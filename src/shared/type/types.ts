import type { githubProvider, googleProvider } from "@/shared";

export type { RootState, AppDispatch } from "@/app/store/store.ts";

export enum Paths {
  Login = "/",
  Admin = "/users",
  Quizzes = "/quizzes",
  ClientEdit = "/users/edit",
}

export enum UserRole {
  User = "USER",
  Admin = "ADMIN",
}

export enum Language {
  "RU" = "ru",
  "EN" = "en",
}

export type UserData = {
  fullname: string;
  email: string;
  id: string;
  photo: string;
  username: string;
  role: UserRole;
  balance: number;
};

export type SearchConditionsUsers = {
  fullname: string;
  username: string;
};

export type QuizData = {
  id: string;
  title: string;
  image?: string;
  time: string;
  questions: Array<{
    id: string;
    image?: string;
    question: string;
    options: Array<string>;
    answer: string;
  }>;
};

export type Provider = typeof githubProvider | typeof googleProvider;
export type Direction = "asc" | "desc";
export type SearchButtonType = "search" | "reset";
export type KeysUserData = keyof UserData;
