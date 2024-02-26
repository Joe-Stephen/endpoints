import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "./userServices";

//Getting user from localstorage
const user = JSON.parse(localStorage.getItem("user"));
console.log("the user===", user);

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//User sign-up
export const signUp = createAsyncThunk(
  "userAuth/signUp",
  async (user, thunkAPI) => {
    try {
      return await userServices.signUp(user);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = userAuthSlice.actions;
export default userAuthSlice.reducer;
