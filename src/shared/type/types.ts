import type { githubProvider, googleProvider } from "@/shared/config";

export type { RootState, AppDispatch } from "@/app/store/store.ts";

export enum Paths {
  Login = "/",
  Admin = "/users",
  ClientEdit = "/users/edit",
  UserPage = "/page",
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

export type QueryConditionParams = Partial<UserData>;

export type QueryConditions = {
  conditionsType: "strict" | "nonStrict";
  conditions: Partial<UserData>;
};

export type Provider = typeof githubProvider | typeof googleProvider;
export type Direction = "asc" | "desc";
export type SearchButtonType = "search" | "reset";
export type Sizes = "small" | "medium";
export type KeysUserData = keyof UserData;
