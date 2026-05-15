import userModel from "../models/usermodel.js";

export const getUsers=async(req,res)=>{
    try {
        const loggedinuserId=req.user.id;
    const users=await userModel.find({_id:{$ne: loggedinuserId}}).select("-password");
    res.status(200).json({
        success:true,
        users
    });
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
        
    }
    

}