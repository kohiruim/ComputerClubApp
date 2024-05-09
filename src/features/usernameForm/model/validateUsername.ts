import { collection, where, query, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/shared/config";
import { notifications } from "@mantine/notifications";
import type { UserData } from "@/shared";

export const usernameRegex = /^[a-zA-Z0-9_-]{2,15}$/;
const validateUsername = async (username: string): Promise<void> => {
  const makeQuery = query(
    collection(db, "users"),
    where("username", "==", username)
  );

  const querySnapshot = await getDocs(makeQuery);
  if (!querySnapshot.empty) {
    throw new Error("User already exists");
  }
};

const addUserInDataBase = async (
  username: string,
  userData: Nullable<UserData>
): Promise<void> => {
  try {
    if (userData) userData.username = username;
    await addDoc(collection(db, "users"), userData);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const submitUsername = async (
  username: string,
  userData: Nullable<UserData>
): Promise<void> => {
  try {
    await validateUsername(username);
    await addUserInDataBase(username, userData);
  } catch (error) {
    if (error instanceof Error) {
      notifications.show({ message: error.message, color: "violet" });
    } else {
      notifications.show({ message: "unknown error", color: "violet" });
    }
  }
};

export const handleSubmit = (
  username: string,
  userData: Nullable<UserData>
) => {
  submitUsername(username, userData).catch(console.error);
};
