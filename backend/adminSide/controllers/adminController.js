const Admin = require('../models/adminModel');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const sendEmail = require('../../services/sendOTP');


//@desc validating admin login details
//@route POST /login
//@access Private
const validateLoginDetails =asyncHandler ( async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('Please add all the fields!');
    }
    console.log(email, password);
    const admin = await Admin.findOne({email});
    if(!admin){
        res.status(400)
        throw new Error('No admin found with this email!');
    }
    if(admin&&(await bcrypt.compare(password, admin.password))){
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            profileUrl:admin.profile_url,
            token: generateToken(admin._id)
        })
    }else{
        res.status(400)
        throw new Error('Incorrect password!');
    }
});

//@desc send otp
//@route POST /verifyEmail
//@access Private
const sendOtp = asyncHandler(async(req, res)=>{
    const {email}=req.body;
    const otp = await sendEmail(email);
    console.log('otp is = ',otp);
    res.status(200).json(`OTP is ${otp}`)
});

//JWT generator function
const generateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'3d',
    });
}

//@desc updating admin details
//@route POST /updateAdmin/:adminId
//@access Private
const updateAdminDetails = asyncHandler (async(req, res)=>{
    const {name, password, email, confirm_password, profile_url} = req.body;
    if(!name|| !password || !email || !confirm_password || !profile_url){
        res.status(400)
        throw new Error('Please add all fields.')
    }
    console.log(name, password, email, profile_url)
    const existingAdmin= await Admin.findOne({email});
    console.log(existingAdmin);
    if(!existingAdmin){
        res.status(400)
        throw new Error('No admin found with this email id.');
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    //admin data updation
    const updatedAdmin=await Admin.findByIdAndUpdate(existingAdmin._id,{
        name,
        email,
        password:hashedPassword,
        profile_url
    },{
        new:true,
    })
    console.log('Admin data updated');
    if(updatedAdmin){
        res.status(201).json(updatedAdmin);
    }else{
        res.status(500).json("Admin data updation failed!.");
        throw new Error('Admin data updation failed!.');
    }
});

module.exports = {
    validateLoginDetails,
    updateAdminDetails,
    sendOtp,
}