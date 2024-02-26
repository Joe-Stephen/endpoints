import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userAuthSlice";

export const store=configureStore({
    reducer:{
        userAuth:userReducer
    }
})