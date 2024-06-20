import { configureStore } from "@reduxjs/toolkit";
import { userReduser } from "@/entities/user";
import { findFriendsReduser } from "@/features/searchUsers";

export const store = configureStore({
  reducer: {
    userSlice: userReduser,
    findFriendsSlice: findFriendsReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
