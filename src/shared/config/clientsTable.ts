import type { KeysUserData } from "@/shared/type";

export const headerItems = ["fullname", "role", "username", "email", "balance"];

export const firebaseKeys: {
  [key: string]: KeysUserData;
} = {
  ФИО: "fullname",
  Роль: "role",
  Никнейм: "username",
  Почта: "email",
  Баланс: "balance",
};
