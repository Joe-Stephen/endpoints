const mongoose = require("mongoose");

const collectorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    profile_url: {
      type: String,
      default: "",  
    },
    location:{
        type:String,
        required:[true, 'Please add your location.']
    },    
    collecting_wastes:{
        type:Array,
        default:["food", "metal", "glass", "plastic"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Collector", collectorSchema);
