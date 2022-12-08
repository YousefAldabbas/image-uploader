import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authService } from "./authService";

let user = null;

const initialState = {
  user: user || null,
  tokens: null,
  isAuthenticated: null,
  isLoading: null,
  isError: null,
  isSuccess: null,
  message: null,
};

// login user
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.login(data);
    } catch (error) {
      console.log(error);
      const message = error.response.data.detail;
      return rejectWithValue(message);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.refresh();
    } catch (error) {
      const message = error.response.data.detail;
      return rejectWithValue(message);
    }
  }
);

export const userInfo = createAsyncThunk(
  "auth/userInfo",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.me();
    } catch (error) {
      console.log(error);
      const message = error.response.data.detail;
      return rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      return await authService.signup(data);
    } catch (error) {
      console.log(error);
      const message = error.response.data.detail;
      return rejectWithValue(message);
    }
  }
);

// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await authService.logout();
//     } catch (error) {
//       console.log(error)
//       const message = error.response.data.detail;
//       return rejectWithValue(message);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
    getAccessToken: (state) => state.user.access_token,
    getRefreshToken: (state) => state.user.refresh_token,
    setRefresh: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      state.isAuthenticated = initialState.isAuthenticated;
      state.isError = initialState.isError;
      state.isLoading = initialState.isLoading;
      state.isSuccess = initialState.isSuccess;
      state.message = initialState.message;
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = null;
        state.tokens = action.payload;
        Cookies.set("access_token", action.payload.access_token);
        Cookies.set("refresh_token", action.payload.refresh_token);

        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(refresh.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        Cookies.set("access_token", action.payload.access_token);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = null;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(userInfo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = null;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
    .addCase(signup.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = null;
    })
    .addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    })
    // .addCase(logout.pending, (state, action) => {
    //   state.isLoading = true;
    //   state.isError = false;
    //   state.isSuccess = false;
    //   state.message = null;
    // })
    // .addCase(logout.fulfilled, (state, action) => {
    //   state.user = null;
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.isSuccess = true;
    //   state.message = null;
    // })
    // .addCase(logout.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.isSuccess = false;
    //   state.message = action.payload;
    // });
  },
});

export const { reset, getRefreshToken, getAccessToken, logout } =
  authSlice.actions;
export default authSlice.reducer;
