import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("DB was connected SUccesfull");
        
    } catch (error) {
        console.log("mongoDb connection error",error.mongoose);
        process.exit(1)
        
        
    }
}

export default connectDB