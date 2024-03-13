const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const generateOTP = require("./otpGenerator");

const sendEmail = asyncHandler(async (email) => {
  const otp = generateOTP();

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Endpoints OTP Verification",
    text: `Your OTP for verification is ${otp}`,
    html: "",
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "Gmail",

    auth: {
      user: process.env.EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions);
  const expirationTime = new Date(Date.now() + 60000); // 1 minute expiration
  return otp;
});

module.exports = sendEmail;
