const express = require("express");
const { protect } = require("../middlewares/userAuthMiddleware.js");
const userRouter = express.Router();
const {
  validateLoginDetails,
  registerNewUser,
  updateUserDetails,
  sendOtp,
  verifyOtp,
  changePassword,
} = require("../controllers/userController");
userRouter.post("/login", validateLoginDetails);
userRouter.post("/sign-up", registerNewUser);
userRouter.post("/verifyEmail", sendOtp);
userRouter.post("/verityOtp", verifyOtp);
userRouter.post("/updateUser/:userID", protect, updateUserDetails);
userRouter.post("/changePassword", changePassword);

module.exports = userRouter;
