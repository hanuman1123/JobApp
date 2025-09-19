import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
    {
        totalUsers:Number,
        totalPosts:Number,
        totalBusinesses:Number,
        suspendedUsers:Number
    },
    {timestamps:true}
);

const Stats = mongoose.model("Stats", statsSchema);
export default Stats