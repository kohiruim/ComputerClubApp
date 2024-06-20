import type { RootState } from "@/shared/type";

export const selectIsAuth = (state: RootState) => state.userSlice.isAuth;
export const selectRole = (state: RootState) =>
  state.userSlice.currentUser.role;
export const selectLoading = (state: RootState) => state.userSlice.isLoading;
export const selectUsers = (state: RootState) =>
  state.userSlice.clientsTable.users;
export const selectRowsLimit = (state: RootState) =>
  state.userSlice.clientsTable.rowsLimit;
export const selectCurrentUser = (state: RootState) =>
  state.userSlice.currentUser;
export const selectTotalUsers = (state: RootState) =>
  state.userSlice.clientsTable.totalCount;
