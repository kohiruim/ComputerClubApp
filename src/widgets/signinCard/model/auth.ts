import { signInWithPopup } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { type UserData, type Provider, UserRole } from "@/entities";
import { auth, db } from "@/shared/config";

const addUserInDataBase = async (data: UserData): Promise<void> => {
  try {
    await addDoc(collection(db, "users"), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const loginUser = async (provider: Provider): Promise<void> => {
  try {
    const result = await signInWithPopup(auth, provider);

    const res: UserData = {
      email: result.user.email ?? "",
      id: result.user.uid,
      photo: result.user.photoURL ?? "",
      username: result.user.displayName ?? "",
      phone: result.user.phoneNumber ?? "",
      role: UserRole.User,
    };
    await addUserInDataBase(res);
  } catch (error) {
    console.log(error);
  }
};

export const handleLogin = (provider: Provider) => {
  if (auth.currentUser) {
    console.log("Вход уже выполнен");
  } else {
    loginUser(provider).catch(error => {
      console.log(error);
    });
  }
};
