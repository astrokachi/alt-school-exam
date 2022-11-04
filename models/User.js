const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  first_name: {
    required: [true, 'Please enter your first name'],
    type: String,
  },
  last_name: {
    required: [true, 'Please enter your last name'],
    type: String,
  },
  email: {
    required: [true, 'Please enter your email'],
    type: String,
    unique: [true, 'email already exists!'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please provide a valid email',
    ],
  },
  password: {
    required: [true, 'Please enter your password'],
    type: String,
    min: [8, 'Password is too short'],
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXP }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
