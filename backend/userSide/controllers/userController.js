const User = require('../models/userModel');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../../services/sendOTP');

//@desc loading home page
//@route GET /
//@access Public
const loadHomePage =asyncHandler ( async(req, res)=>{
    res.status(200).json("Welcome to home page.");
    // res.status(500).json("Couldn't load home page!");
    // throw new Error("Couldn't load home page!");
})

//@desc loading user login page
//@route GET /login
//@access Public
const loadUserLoginPage = asyncHandler ( async(req, res)=>{
    res.status(200).json("User login page.");
    // res.status(500).json("Couldn't load user login page!");
    // throw new Error("Couldn't load user login page!");
})

//@desc validating user login details
//@route POST /login
//@access Public
const validateLoginDetails =asyncHandler ( async(req, res)=>{
    const {email, password} = req.body;
    console.log(email, password);
    res.status(200).json("User validated.");
    // res.status(500).json("Couldn't load user login page!");
    // throw new Error("Couldn't load user login page!");
})

//@desc send otp
//@route GET /otp
//@access Public
const sendOtp = asyncHandler(async(req, res)=>{
    const {email}=req.body;
    const otp = await sendEmail(email);
    console.log('otp is = ',otp);
    res.status(200).json(`OTP is ${otp}`)
});



//@desc validating user creation details
//@route POST /login
//@access Public
const registerNewUser = asyncHandler (async(req, res)=>{
    const {first_name, last_name, email, password, confirm_password, location, profile_url} = req.body;
    if(!first_name|| !last_name|| !email|| !password|| !confirm_password|| !location || !profile_url){
        res.status(400)
        throw new Error('Please add all fields.')
    }
    const existingUser= await User.findOne({email});
    if(existingUser){
        res.status(400)
        throw new Error('This email is already registered.');
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //user creation
    const user=await User.create({
        first_name,
        last_name,
        email,
        password:hashedPassword,
        location,
        profile_url
    })
    console.log('User created');
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.first_name+" "+user.last_name,
            email:user.email,
            location:user.loction,
            profile_url:user.profile_url,
            token: generateToken(user._id)
        });
    }else{
        res.status(500).json("User registration failed!.");
        throw new Error('User registration failed!.');
    }
});

//JWT generator function
const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'3d',
    });
}

//@desc updating user details
//@route POST /updateUser/:userId
//@access Public
const updateUserDetails = asyncHandler (async(req, res)=>{
    const {first_name, last_name, password, email, confirm_password, location} = req.body;
    if(!first_name|| !last_name|| !password || !email || !confirm_password || !location){
        res.status(400)
        throw new Error('Please add all fields.')
    }
    const existingUser= await User.findOne({email});
    if(!existingUser){
        res.status(400)
        throw new Error('No user found with this email id.');
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //user data updation
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        first_name,
        last_name,
        email,
        password:hashedPassword,
        location,
    },{
        new:true,
    })
    console.log('User data updated');
    if(updatedUser){
        res.status(201).json(updatedUser);
    }else{
        res.status(500).json("User data updation failed!.");
        throw new Error('User data updation failed!.');
    }
});


module.exports = {
    loadHomePage,
    loadUserLoginPage,
    validateLoginDetails,
    registerNewUser,
    updateUserDetails,
    sendOtp,
}