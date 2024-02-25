const express = require("express");
const collectorRouter = express.Router();
const {
  validateLoginDetails,
  registerNewCollector,
  updateCollectorDetails,
  sendOtp,
} = require("../controllers/collectorController");
collectorRouter.route('/login').post(validateLoginDetails);
collectorRouter.route("/sign-up").post(registerNewCollector);
collectorRouter.route('/verifyEmail').post(sendOtp);
collectorRouter.route("/updateCollector/:collectorID").post(updateCollectorDetails);

module.exports = collectorRouter;