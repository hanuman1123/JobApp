import User from "../models/auth.model.js";
import BussinessApplication from "../models/businness.application.model.js";
import Post from "../models/post.model.js";




export const getPendingApplicationAdmin = async(req,res) => {
    try {
        const apps = await BussinessApplication.find({status:"PENDING"}).populate(
            "applicant",
            "name email"
        );
        res.json(apps)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

export const approveApplication = async(req,res) => {
    try {
        const app = await
        BussinessApplication.findById(req.params.applicationId);
        if(!app) {
            return res.status(404).json({message:"Application not found"})

        };
        app.status = "APPROVED"
        app.reviewedBy = req.user.id;
        await app.save();
        res.json(app);
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
};


export const rejectApplication = async(req,res) => {
    try {
        const app = await BussinessApplication.findById(req.params.applicationId);
        if(!app){
            return res.status(404).json({message:"Application not found"});

        }

        app.status = "REJECTED";
        app.reviewedBy = req.user.id;
        await app.save();
        return res.json(app)
    } catch (error) {

        res.status(500).json({message:error.message})
        
    }
};

export const getAllUsers = async(req,res) => {
    try {
        const users = await User.find().select("-password");
        return res.json(users)
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
} 

export const suspendedUser  = async(req,res) => {
    try {
        const user = await User.findById(req.params.userId);
        if(!user) {
            return res.status(404).json({
                message:"User not found"
            });


        }

        user.isSuspended = true,
        await user.save()
        return res.status(500).json({message:"User Suspended",user})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}



export const getStats = async(req,res) => {
    try {
        const totalUser = await User.countDocuments();
        const totalPosts = await Post.countDocuments();
        const totalBussiness = await User.countDocuments({userType:"BUSSINESS_OWNER"})
        const suspendedUser= await User.countDocuments({isSuspended:true});
        return res.json({totalUser,totalPosts,totalBussiness,suspendedUser})
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}