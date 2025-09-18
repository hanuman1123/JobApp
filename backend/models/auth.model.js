import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwors: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    enum: ["REGULAR_USER", "BUSSINESS_OWNER", "IT_COMPANY", "ADMIN"],
    default: "REGULAR_USER",
  },

  ProfileImage: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  bio: [
    {
      type: String,
    },
  ],
  businessInfo: {
    companyName:String,
    website:String,
    location:String,
    description:String
  },
},{timestamps:true});

const User = mongoose.model("User",userSchema);
export default User