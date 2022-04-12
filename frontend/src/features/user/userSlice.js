import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../components/Axios";

const access = localStorage.getItem("access_token");

const initialState = access
  ? { isLoggedIn: true}
  : { isLoggedIn: false};

// async signup action
export const signup = createAsyncThunk("user/signup", async () => {});

// async login action
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await axiosInstance.post("token/", {
        email: email,
        password: password,
      });
      // set jwt in local storage
      localStorage.setItem("access_token", result.data.access);
      localStorage.setItem("refresh_token", result.data.refresh);
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");
      console.log(result.data);
      return result;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue();
    }
  }
);

// user slice of state
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("access_token");
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

// actions
export const {} = userSlice.actions;

// reducer
export default userSlice.reducer;
