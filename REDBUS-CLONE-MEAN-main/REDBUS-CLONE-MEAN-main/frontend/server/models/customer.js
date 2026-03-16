const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  passwordHash: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  fcmToken: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    enum: ['en', 'hi'],
    default: 'en',
  },
});

module.exports=mongoose.model("Customers",customerSchema)