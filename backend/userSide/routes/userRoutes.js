const express = require("express");
const userRouter = express.Router();
const {
  loadHomePage,
  loadUserLoginPage,
  validateLoginDetails,
  registerNewUser,
  updateUserDetails,
} = require("../controllers/userController");

userRouter.route("/").get(loadHomePage);
userRouter.route("/login").get(loadUserLoginPage).post(validateLoginDetails);
userRouter.route("/sign-up").post(registerNewUser);
userRouter.route("/updateUser/:userID").post(updateUserDetails);

module.exports = userRouter;