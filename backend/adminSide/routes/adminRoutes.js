const express = require("express");
const adminRouter = express.Router();
const {
  validateLoginDetails,
  updateAdminDetails,
  sendOtp,
} = require("../controllers/adminController");

adminRouter.route("/login").post(validateLoginDetails);
adminRouter.route('/verifyEmail').post(sendOtp);
adminRouter.route("/updateAdmin").post(updateAdminDetails);

module.exports = adminRouter;