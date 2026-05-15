import userModel from "../models/usermodel.js";
export const getMe= async(req,res)=>{
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
        
    } catch (e) {
        return res.status(500).json({
            success: false,
            message:e.message
        })
        
    }

}