import type { githubProvider, googleProvider } from "@/shared";

export enum UserRole {
  User = "user",
  Admin = "admin",
}
export interface UserData {
  email: string;
  id: string;
  photo: string;
  username: string;
  phone: string;
  role: UserRole;
}

export type Provider = typeof githubProvider | typeof googleProvider;
