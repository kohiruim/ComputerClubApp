import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  validateForm,
  makeSortedQuery,
  db,
  type SearchConditionsUsers,
  type UserData,
  type RootState,
  type KeysUserData,
  type Direction,
} from "@/shared";
import { collection, doc, setDoc, getDocs, query } from "firebase/firestore";
import { notifications } from "@mantine/notifications";
import { UserRole } from "@/shared/type";

type ClientsTable = {
  users: Array<UserData>;
  totalCount: number;
  rowsLimit: number;
  searchConditions: SearchConditionsUsers;
};

type UserState = {
  currentUser: UserData;
  isAuth: boolean;
  clientsTable: ClientsTable;
  error: string;
  isLoading: boolean;
};

type ClientsQueryContext = {
  rejectValue: string;
  state: RootState;
};

type ClientsQueryArg = {
  item: KeysUserData;
  direction: Direction;
};

const initialState: UserState = {
  currentUser: {
    email: "",
    id: "",
    photo: "",
    role: UserRole.User,
    username: "",
    balance: 0,
    fullname: "",
  },
  clientsTable: {
    users: [],
    totalCount: 0,
    rowsLimit: 5,
    searchConditions: {
      fullname: "",
      username: "",
    },
  },
  isAuth: false,
  error: "",
  isLoading: false,
};

const setError = (
  state: UserState,
  action?: PayloadAction<string | undefined>
) => {
  const errorMessage = action?.payload ?? "unknown error";
  if (!state.error) {
    state.isLoading = false;
    state.error = errorMessage;
    notifications.show({ message: state.error, color: "violet" });
  }
};

const resetStateError = (state: UserState) => {
  state.isLoading = true;
  state.error = "";
};

export const modifyUserInDataBase = createAsyncThunk<
  void,
  { user: UserData; actionType: "add" | "update" },
  { rejectValue: string }
>(
  "userReducer/modifyUserInDataBase",
  async ({ user, actionType }, { rejectWithValue }) => {
    try {
      await validateForm(user.username, "username", actionType);
      await validateForm(user.email, "email", actionType);
      const userDocRef = doc(db, "users", user.id);
      await setDoc(userDocRef, user);
      return;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(
          `Error in modifyUserInDataBase: ${error.message}`
        );
      }
      return rejectWithValue("Unknown error occurred in modifyUserInDataBase");
    }
  }
);

export const makeClientsQuery = createAsyncThunk<
  Array<UserData>,
  ClientsQueryArg,
  ClientsQueryContext
>(
  "userReducer/makeClientsQuery",
  async ({ item, direction }, { getState, rejectWithValue }) => {
    const table: ClientsTable = getState().userSlice.clientsTable;
    const searchConditions = table.searchConditions;
    const tableRowsLimit = table.rowsLimit;
    const queryParams = { item, direction, searchConditions, tableRowsLimit };
    try {
      const data: Array<UserData> = await makeSortedQuery(queryParams);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("unknown error");
    }
  }
);

export const setTotalCountUsers = createAsyncThunk<number>(
  "userReducer/setTotalCountUsers",
  async (_, { rejectWithValue }) => {
    try {
      const usersQuery = query(collection(db, "users"));
      const querySnapshot = await getDocs(usersQuery);
      return querySnapshot.size;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("unknown error");
    }
  }
);

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserData>) {
      state.currentUser = action.payload;
    },
    setUserRole(state, action: PayloadAction<UserRole>) {
      state.currentUser.role = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setCurrentUsername(state, action: PayloadAction<string>) {
      if (!state.error) {
        state.currentUser.username = action.payload;
      }
    },
    setUsers(state, action: PayloadAction<Array<UserData>>) {
      state.clientsTable.users = action.payload;
    },
    setSearchConditions(state, action: PayloadAction<SearchConditionsUsers>) {
      state.clientsTable.searchConditions = action.payload;
    },
    increaseTableRowsLimit(state) {
      state.clientsTable.rowsLimit = state.clientsTable.rowsLimit + 5;
    },
  },
  extraReducers: builder => {
    builder.addCase(modifyUserInDataBase.pending, resetStateError);
    builder.addCase(modifyUserInDataBase.rejected, setError);
    builder.addCase(modifyUserInDataBase.fulfilled, state => {
      state.clientsTable.totalCount += 1;
      state.isLoading = false;
    });
    builder.addCase(makeClientsQuery.pending, resetStateError);
    builder.addCase(makeClientsQuery.rejected, setError);
    builder.addCase(makeClientsQuery.fulfilled, (state, action) => {
      state.clientsTable.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(setTotalCountUsers.pending, resetStateError);
    builder.addCase(setTotalCountUsers.fulfilled, (state, action) => {
      state.clientsTable.totalCount = action.payload;
      state.isLoading = false;
    });
  },
});

export const userReduser = userSlice.reducer;
export const {
  setCurrentUser,
  setUserRole,
  setIsAuth,
  setCurrentUsername,
  setUsers,
  setSearchConditions,
  increaseTableRowsLimit,
} = userSlice.actions;
