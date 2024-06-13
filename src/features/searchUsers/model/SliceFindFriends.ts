import type { UserData, QueryConditions } from "@/shared/type";
import { makeFirebaseQuery, errorsHanlder } from "@/shared/lib";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

type FindFriendsState = {
  foundUser: string;
  friends: Array<UserData>;
  isLoading: boolean;
  error: string;
};

const initialState: FindFriendsState = {
  foundUser: "",
  friends: [],
  isLoading: false,
  error: "",
};

export const setFriends = createAsyncThunk(
  "findFriendsReducer/setFriends",
  async (desiredUser: string, { rejectWithValue }) => {
    const searchConditions: QueryConditions = {
      conditionsType: "nonStrict",
      conditions: { username: desiredUser },
    };
    try {
      if (desiredUser) {
        const data: Array<UserData> = await makeFirebaseQuery({
          searchConditions,
        });
        return data;
      }
      return [];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("unknown error");
    }
  }
);

const findFriendsSlice = createSlice({
  name: "findFriendsReducer",
  initialState,
  reducers: {
    setFoundUser(state, action: PayloadAction<string>) {
      state.foundUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setFriends.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(setFriends.rejected, errorsHanlder);
    builder.addCase(setFriends.fulfilled, (state, action) => {
      state.isLoading = false;
      state.friends = action.payload;
    });
  },
});

export const findFriendsReduser = findFriendsSlice.reducer;
export const { setFoundUser } = findFriendsSlice.actions;
