import mongoose, { mongo } from "mongoose";

const businessApplicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status:{
    type:String,
    enum:["PENDING","APPROVED","REJECTED"],
    default:"PENDING"
  },
  documents:[
    {
        type:String
    }
  ],
  reviewedBy:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]
},{timestamps:true});


const BussinessApplication = mongoose.model("BussinessApplication",businessApplicationSchema)

export default BussinessApplication
