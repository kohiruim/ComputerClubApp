import type { Dispatch, SetStateAction } from "react";
import { notifications } from "@mantine/notifications";
import { signInWithPopup } from "firebase/auth";
import { auth, db, type UserData, type Provider, UserRole } from "@/shared";
import { collection, where, query, getDocs } from "firebase/firestore";

const findUser = async (email: string) => {
  const makeQuery = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(makeQuery);
  if (!querySnapshot.empty) {
    throw new Error("user logged");
  }
};

export const showWidget = (
  setWidget: Dispatch<SetStateAction<boolean>>
) => {
  return () => {
    setWidget(true);
  };
};

const openCreateUsername = async (
  email: string,
  setshowUsernameWidget: () => void
) => {
  try {
    await findUser(email);
    setshowUsernameWidget();
  } catch {
    notifications.show({ message: "юзер зашел в учетку", color: "violet" });
  }
};

const loginUser = async (
  provider: Provider,
  setUserData: (data: UserData) => void,
  setshowUsernameWidget: () => void
): Promise<void> => {
  const result = await signInWithPopup(auth, provider);
  const res: UserData = {
    email: result.user.email ?? "",
    id: result.user.uid,
    photo: result.user.photoURL ?? "",
    username: "",
    phone: result.user.phoneNumber ?? "",
    role: UserRole.User,
  };
  setUserData(res);
  await openCreateUsername(res.email, setshowUsernameWidget);
};

export const handleLogin = (
  provider: Provider,
  setUserData: (data: UserData) => void,
  setshowUsernameWidget: () => void
) => {
  loginUser(provider, setUserData, setshowUsernameWidget).catch(error => {
    console.error(error);
  });
};
