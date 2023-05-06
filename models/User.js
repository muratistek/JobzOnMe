import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Provide a valid email"
    },
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName"
  },
  location: {
    type: String,
    default: "CITY",
    maxlength: 20,
    trim: true
  }
})

// Setting up the middleware for registering 
UserSchema.pre('save', async function () {
  // This function will return the field names that we are updating in the database (that are different from ones we have on the database).

  // console.log(this.modifiedPaths())

  // This is crucial because we should hash the password only once, otherwise login won't work. Also, it prevents the error where we don't provide the "password" field in some controller methods and "bcrypt.hash()" triggers error
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Generate a token and attach userID, so when we call "jwt.verify" in the "auth" middleware, we can get the value back in the "payload" variable
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model("User", UserSchema)