import type { QueryConditions } from "@/shared/type";
import { makeFirebaseQuery } from "@/shared/lib";
import { z } from "zod";
import type { TFunction } from "i18next";

export const emailRegex = /@gmail\.com$/;
export const usernameRegex = /^[a-zA-Z0-9_-]{2,15}$/;

export const usernameValidation = (t: TFunction) =>
  z
    .string()
    .regex(usernameRegex, t("invalid username. Only lettern, numbers, -,_"))
    .min(2, t("min length is 2"))
    .max(15, t("max length is 15"));

export const emailValidation = (t: TFunction) =>
  z
    .string()
    .regex(emailRegex, t("only gmail"))
    .email({ message: t("invalid email") });

export const validateForm = async (
  value: string,
  inputType: "username" | "email",
  actionType: "add" | "update"
): Promise<void> => {
  const searchConditions: QueryConditions = {
    conditionsType: "strict",
    conditions: { [inputType]: value },
  };
  const querySnapshot = await makeFirebaseQuery({ searchConditions });
  const countDocs = actionType == "add" ? 0 : 1;

  if (querySnapshot.length > countDocs) {
    throw new Error("User already exists");
  }
};
