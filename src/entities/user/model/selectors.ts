import type { RootState } from "@/shared";

export const selectIsAuth = (state: RootState) => state.userSlice.isAuth;
export const selectUserRole = (state: RootState) =>
  state.userSlice.currentUser.role;
