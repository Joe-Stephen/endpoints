const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
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
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
