// import User from "../models/auth.mode.js";
import User from "../models/auth.model.js";

export const getProfile = async(req,res) => {
    try {
        const user = await 
        User.findById(req.params.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.json(user)
    } catch (error) {
        return res.status(500).json({message:error.messsage});

    }
}


export const updateProfile = async(req,res) => {
    try {
        const update = req.body
        const updateUser = await User.findByIdAndUpdate(
            req.user.id,
            {$set:update},
            {$new:true}
        ).select("-password");
        res.json(updateUser)
    } catch (error) {
        return res.status(500).json({message: error.message});
        
    }
};


export const updateProfileImage = async(req,res) => {
    try {
        if(!req.file){
            return res.status(400).json({message:"No file found"})

        }
        const updateUser = await User.findByIdAndUpdate(req.user.id,
            {ProfileImage:req.file.path},
            {new:true}
        ).select("-password");
        return res.json(updateUser)
    } catch (error) {
        return res.status(500).json({message:error.message})
        
    }
}