const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../../services/sendOTP");

//@desc validating user login details
//@route POST /login
//@access Public
const validateLoginDetails = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Please add all fields." });
    throw new Error("Please add all fields.");
  }
  console.log(email, password);
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(400).json({ error: "No user found with this email id" });
    throw new Error("No user found with this email id.");
  }
  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    res.status(201).json({
      _id: existingUser._id,
      name: existingUser.username,
      email: existingUser.email,
      profileUrl: existingUser.profile_url,
      token: generateToken(existingUser._id),
    });
  } else {
    res.status(400).json({ error: "Incorrect password!" });
    throw new Error("Incorrect password!");
  }
});

//@desc send otp
//@route POST /verifyEmail
//@access Public
const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Please provide a valid email address!" });
    throw new Error("No email address provided!");
  }
  const otp = await sendEmail(email);
  const expirationTime = new Date(Date.now() + 60000); // 1 minute expiration
  
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ error: "No user found with this email address!" });
    throw new Error("Unable to send otp!");
  }
  console.log("user", user);
  await User.findByIdAndUpdate(user._id, {
    otp,
    otpExpiration: expirationTime,
  });
  res.status(200).json({ userId: user._id });
  if (!otp) {
    res.status(400).json({ error: "Unable to send otp!" });
    throw new Error("Unable to send otp!");
  }
});

//@desc verify otp
//@route POST /verifyEmail
//@access Public
const verifyOtp = asyncHandler(async (req, res) => {
  console.log("body= ", req.body);
  const user = await User.findOne({ _id: req.body.userId });
  console.log("user", user);
  if (req.body.otpAttempt !== user.otp) {
    res.status(400).json({ error: "Incorrect OTP." });
    throw new Error("Incorrect OTP.");
  } else if (user.otpExpiration < new Date()) {
    res.status(400).json({ error: "OTP has been expired. Please retry." });
    throw new Error("OTP has been expired. Please retry.");
  } else if (req.body.otpAttempt === user.otp) {
    await User.findByIdAndUpdate(user._id, { $unset: { otp: "" } });
    return res.status(200).json("OTP has been verified.");
  }
});

//@desc validating user creation details
//@route POST /sign-up
//@access Public
const registerNewUser = asyncHandler(async (req, res) => {
  console.log("reached the function");
  const { username, email, password, confirm_password, location, profile_url } =
    req.body;
  console.log("username=", username);
  if (!username || !email || !password || !confirm_password || !location) {
    res.status(400).json({ error: "Please add all fields." });
    throw new Error("Please add all fields.");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("This email is already registered.");
  }
  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //user creation
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    location,
    profile_url,
  });
  console.log("User created");
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
      location: user.loction,
      profile_url: user.profile_url,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).json({ error: "User registration failed!." });
    throw new Error("User registration failed!.");
  }
});

//JWT generator function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

//@desc updating user details
//@route POST /updateUser/:userId
//@access Public
const updateUserDetails = asyncHandler(async (req, res) => {
  const { username, password, email, confirm_password, location } = req.body;
  if (!username || !password || !email || !confirm_password || !location) {
    res.status(400).json({ error: "Please add all fields." });
    throw new Error("Please add all fields.");
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(400).json({ error: "No user found with this email id." });
    throw new Error("No user found with this email id.");
  }
  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //user data updation
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      username,
      email,
      password: hashedPassword,
      location,
    },
    {
      new: true,
    }
  );
  console.log("User data updated");
  if (updatedUser) {
    res.status(201).json(updatedUser);
  } else {
    res.status(500).json({ error: "User data updation failed!" });
    throw new Error("User data updation failed!");
  }
});

//@desc updating user details
//@route POST /updateUser/:userId
//@access Public
const changePassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword, userId } = req.body;
  console.log("body= ", req.body);
  if (!password || !confirmPassword) {
    res.status(400).json({ error: "Please add all fields." });
    throw new Error("Please add all fields.");
  }
  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords doesn't match." });
    throw new Error("Passwords doesn't match.");
  }
  const existingUser = await User.findOne({ _id: userId });
  if (!existingUser) {
    res.status(400).json({ error: "No user found with this email id." });
    throw new Error("No user found with this email id.");
  }
  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //user data updation
  const updatedUser = await User.findByIdAndUpdate(
    existingUser._id,
    {
      password: hashedPassword,
    },
    {
      new: true,
    }
  );
  console.log("User password updated");
  if (updatedUser) {
    res.status(201).json(updatedUser);
  } else {
    res.status(500).json({ error: "User password updation failed!" });
    throw new Error("User password updation failed!");
  }
});

module.exports = {
  validateLoginDetails,
  registerNewUser,
  updateUserDetails,
  sendOtp,
  verifyOtp,
  changePassword,
};
