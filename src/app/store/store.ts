import { configureStore } from "@reduxjs/toolkit";
import { userReduser } from "@/entities";

export const store = configureStore({
  reducer: {
    userSlice: userReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
