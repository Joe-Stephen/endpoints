const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Please add your name.']
    },
    email:{
        type:String,
        required:[true, 'Please add your email.'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Please add a password.'],
    },
    location:{
        type:String,
        required:[true, 'Please add your location.']
    },
    is_blocked:{    
        type:Boolean,
        default:false,
    },
    rating:{
        type:String,
        default:'Excellent',
    },
    disposal_stats:{
        type:Array,
        default:[{food:0}, {metal:0}, {glass:0}, {plastic:0}],
    },
    profile_url:{
        type:String,
        default:'',
    },
    otp:{type:String},
    otpExpiration:{type:Date}
},
{
    timestamp:true
});

module.exports = mongoose.model('User', userSchema);