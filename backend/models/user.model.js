// user.model.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'], // Adjust based on your roles
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
