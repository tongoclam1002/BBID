import api from "../../app/api/api";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { User } from "../../app/interfaces/user.interface";
import { fetchCartAsync } from "../Cart/cartSlice";
import { useAppDispatch } from "../../app/store/configureStore";

const token = JSON.parse(localStorage.getItem("token"));

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

// export const register = createAsyncThunk<
//   any,
//   { username: string; password: string }
// >("account/register", async ({ username, password }, thunkAPI) => {
//   try {
//     const response = await api.Account.register(username, password);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue({ error: error.data });
//   }
// });

export const login = createAsyncThunk<User, FieldValues>(
  "account/login",
  async (data, thunkAPI) => {
    try {
      const response = await api.Account.login(data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const logout = createAsyncThunk("account/logout", async () => {
  await api.Account.logout();
});

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await api.Account.currentUser();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
    });
    builder.addMatcher(isAnyOf(login.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(isAnyOf(login.rejected), (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { signOut, setUser } = accountSlice.actions;
