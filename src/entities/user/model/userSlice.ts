import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { db } from "@/shared/config";
import { validateForm, makeFirebaseQuery, errorsHanlder } from "@/shared/lib";
import {
  UserRole,
  type QueryConditions,
  type QueryConditionParams,
  type UserData,
  type RootState,
  type KeysUserData,
  type Direction,
} from "@/shared/type";
import { collection, doc, setDoc, getDocs, query } from "firebase/firestore";

type ClientsTable = {
  users: Array<UserData>;
  totalCount: number;
  rowsLimit: number;
  searchConditions: QueryConditions;
};

type UserState = {
  currentUser: UserData;
  isAuth: boolean;
  clientsTable: ClientsTable;
  error: string;
  isLoading: boolean;
};

type ClientsQueryArg = {
  sortedItem: KeysUserData;
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
      conditionsType: "nonStrict",
      conditions: {
        fullname: "",
        username: "",
      },
    },
  },
  isAuth: false,
  error: "",
  isLoading: false,
};

type ModifyUser = {
  user: UserData;
  actionType: "add" | "update";
};

export const modifyUserInDataBase = createAsyncThunk(
  "userReducer/modifyUserInDataBase",
  async (params: ModifyUser, { rejectWithValue }) => {
    try {
      const { user, actionType } = params;
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

export const makeClientsQuery = createAsyncThunk(
  "userReducer/makeClientsQuery",
  async (params: ClientsQueryArg, { getState, rejectWithValue }) => {
    const { sortedItem, direction } = params;
    const state = getState() as RootState;

    const table: ClientsTable = state.userSlice.clientsTable;
    const searchConditions = table.searchConditions;
    const tableRowsLimit = table.rowsLimit;
    const queryParams = {
      sortedItem,
      direction,
      searchConditions,
      tableRowsLimit,
    };
    try {
      const data: Array<UserData> = await makeFirebaseQuery(queryParams);
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
    setSearchConditions(state, action: PayloadAction<QueryConditionParams>) {
      state.clientsTable.searchConditions.conditions = action.payload;
    },
    increaseTableRowsLimit(state) {
      state.clientsTable.rowsLimit = state.clientsTable.rowsLimit + 5;
    },
  },
  extraReducers: builder => {
    builder.addCase(modifyUserInDataBase.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(modifyUserInDataBase.rejected, errorsHanlder);
    builder.addCase(modifyUserInDataBase.fulfilled, state => {
      state.clientsTable.totalCount += 1;
      state.isLoading = false;
    });
    builder.addCase(makeClientsQuery.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(makeClientsQuery.rejected, errorsHanlder);
    builder.addCase(makeClientsQuery.fulfilled, (state, action) => {
      state.clientsTable.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(setTotalCountUsers.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(setTotalCountUsers.rejected, errorsHanlder);
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
