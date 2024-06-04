import { signInWithPopup } from "firebase/auth";
import { auth, db, type UserData, type Provider, UserRole } from "@/shared";
import { collection, where, query, getDocs } from "firebase/firestore";
import type { AppDispatch } from "@/app/store/store";
import {
  setCurrentUser,
  setUserRole,
  setIsAuth,
  setCurrentUsername,
} from "@/entities";

const findUserInDB = async (
  email: string,
  dispatch: AppDispatch
): Promise<void> => {
  const makeQuery = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(makeQuery);

  if (!querySnapshot.empty) {
    const data: UserData = querySnapshot.docs[0]?.data() as UserData;
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
