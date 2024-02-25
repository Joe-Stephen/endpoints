const express = require("express");
const userRouter = express.Router();
const {
  validateLoginDetails,
  registerNewUser,
  updateUserDetails,
  sendOtp,
} = require("../controllers/userController");
userRouter.route('/login').post(validateLoginDetails);
userRouter.route("/sign-up").post(registerNewUser);
userRouter.route('/verifyEmail').post(sendOtp);
userRouter.route("/updateUser/:userID").post(updateUserDetails);

module.exports = userRouter;