import type { RootState } from "@/shared/type";

export const selectFoundUser = (state: RootState) =>
  state.findFriendsSlice.foundUser;
export const selectFriends = (state: RootState) =>
  state.findFriendsSlice.friends;
export const selectLoading = (state: RootState) =>
  state.findFriendsSlice.isLoading;
