import { signInWithPopup } from "firebase/auth";
import {
  type UserData,
  type Provider,
  UserRole,
  type QueryConditions,
} from "@/shared/type";
import { makeFirebaseQuery } from "@/shared/lib";
import { auth } from "@/shared/config";
import type { AppDispatch } from "@/app/store/store";
import {
  setCurrentUser,
  setUserRole,
  setIsAuth,
  setCurrentUsername,
} from "@/entities/user";

const findUserInDB = async (
  email: string,
  dispatch: AppDispatch
): Promise<void> => {
  const searchConditions: QueryConditions = {
    conditionsType: "strict",
    conditions: { email: email },
  };

  const querySnapshot = await makeFirebaseQuery({ searchConditions });

  if (querySnapshot.length) {
    const data: UserData = querySnapshot[0] as UserData;
    const userRole: UserRole = data?.role;
    const username: string = data?.username ?? "";
    dispatch(setCurrentUsername(username));
    dispatch(setUserRole(userRole));
  }

  dispatch(setIsAuth(true));
};

export const loginUser = async (
  provider: Provider,
  dispatch: AppDispatch
): Promise<void> => {
  const result = await signInWithPopup(auth, provider);
  const res: UserData = {
    email: result.user.email ?? "",
    id: result.user.uid,
    photo: result.user.photoURL ?? "",
    username: "",
    role: UserRole.User,
    balance: 0,
    fullname: result.user.displayName ?? "",
  };
  dispatch(setCurrentUser(res));
  await findUserInDB(res.email, dispatch);
};
