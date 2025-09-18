import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
    requestId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    },
    recipientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    },

    status:{
        type:String,
        enum:["PENDING","ACCEPTED","DECLINED"],
        default:"PENDING"
    }

},{
    timestamps:true
})

const Connection = mongoose.model("Connection",connectionSchema)

export default Connection