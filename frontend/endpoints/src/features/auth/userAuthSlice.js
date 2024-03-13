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
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

//user login
export const login = createAsyncThunk(
  "userAuth/login",
  async (user, thunkAPI) => {
    try {
      return await userServices.login(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

//user forgot password-sendOtp
export const sendOtp=createAsyncThunk(
  "userAuth/forgotPassword",async(email, thunkAPI)=>{
    try {
      return await userServices.sendOtp(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
)

//user forgot password-sendOtp
export const verifyOtp=createAsyncThunk("userAuth/verifyOtp", async( otpData, thunkAPI)=>{
  try {
    return await userServices.verifyOtp(otpData);
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.error);    
  }
})

//user change password
export const changePassword=createAsyncThunk("userAuth/changePassword", async( newPassword, thunkAPI)=>{
  try {
    return await userServices.changePassword(newPassword);
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("error", error);
      return thunkAPI.rejectWithValue(error.response.data.error);    
  }
})

//Logout user
export const logout = createAsyncThunk("userAuth/logout", async () => {
  await userServices.logout();
});

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
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});
export const { reset } = userAuthSlice.actions;
export default userAuthSlice.reducer;
