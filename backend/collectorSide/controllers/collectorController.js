const Collector = require("../models/collectorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../../services/sendOTP");

//@desc validating Collector login details
//@route POST /login
//@access Public
const validateLoginDetails = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields.");
  }
  console.log(email, password);
  const existingCollector = await Collector.findOne({ email });
  if (!existingCollector) {
    res.status(400);
    throw new Error("No Collector found with this email id.");
  }
  if (
    existingCollector &&
    (await bcrypt.compare(password, existingCollector.password))
  ) {
    res.status(200).json({
      _id: existingCollector._id,
      name: existingCollector.name,
      email: existingCollector.email,
      location: existingCollector.loction,
      profile_url: existingCollector.profile_url,
      collecting_wastes: existingCollector.collecting_wastes,
      token: generateToken(existingCollector._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect password!");
  }
});

//@desc send otp
//@route POST /verifyEmail
//@access Public
const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = await sendEmail(email);
  console.log("otp is = ", otp);
  res.status(200).json(`OTP is ${otp}`);
});

//@desc validating Collector creation details
//@route POST /login
//@access Public
const registerNewCollector = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    confirm_password,
    location,
    profile_url,
    collecting_wastes,
  } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !confirm_password ||
    !location ||
    !profile_url ||
    !collecting_wastes
  ) {
    res.status(400);
    throw new Error("Please add all fields.");
  }
  const existingCollector = await Collector.findOne({ email });
  if (existingCollector) {
    res.status(400);
    throw new Error("This email is already registered.");
  }
  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Collector creation
  const collector = await Collector.create({
    name,
    email,
    password: hashedPassword,
    location,
    profile_url,
    collecting_wastes,
  });
  console.log("Collector created");
  if (collector) {
    res.status(201).json({
      _id: collector._id,
      name: collector.name,
      email: collector.email,
      location: collector.loction,
      profile_url: collector.profile_url,
      collecting_wastes: collector.collecting_wastes,
      token: generateToken(Collector._id),
    });
  } else {
    res.status(500).json("Collector registration failed!.");
    throw new Error("Collector registration failed!.");
  }
});

//JWT generator function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

//@desc updating Collector details
//@route POST /updateCollector/:CollectorId
//@access Public
const updateCollectorDetails = asyncHandler(async (req, res) => {
  const { name, password, email, confirm_password, location, collecting_wastes } = req.body;
  if (!name || !password || !email || !confirm_password || !location || !collecting_wastes) {
    res.status(400);
    throw new Error("Please add all fields.");
  }
  console.log(name, password, email, confirm_password, location, collecting_wastes);
  const existingCollector = await Collector.findOne({ email });
  if (!existingCollector) {
    res.status(400);
    throw new Error("No Collector found with this email id.");
  }
  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Collector data updation
  const updatedCollector = await Collector.findByIdAndUpdate(
    existingCollector._id,
    {
      name,
      email,
      password: hashedPassword,
      location,
      collecting_wastes
    },
    {
      new: true,
    }
  );
  console.log("Collector data updated");
  if (updatedCollector) {
    res.status(201).json(updatedCollector);
  } else {
    res.status(500).json("Collector data updation failed!.");
    throw new Error("Collector data updation failed!.");
  }
});

module.exports = {
  validateLoginDetails,
  registerNewCollector,
  updateCollectorDetails,
  sendOtp,
};
