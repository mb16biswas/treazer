const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
    },
    email: {
      unique : true , 
      type: String,
      required: true,

      trim: true,
      minlength: 15,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    ph: {
      type: String,
      required: true,
     
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
