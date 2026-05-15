import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "missing details" });

    }
    
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
    try {
         const userExist = await userModel.findOne({ email });
       
        if (userExist) {
            return res.status(409).json({ success: false, message: "user already exist" });

        }
        const hashedPassword =  await bcrypt.hash(password, 10);
       const user= await userModel.create({name,email,password:hashedPassword})
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
       res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==='production',
        sameSite: process.env.NODE_ENV==='production' ?'none':'lax',
        maxAge: 7*24*60*60*1000,
        path:'/'



        
       })
       res.status(201).json({success:true,
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        }
       });

    } catch (error) {
        res.status(500).json({success:false,message:error.message});

    }


}
export const login=async(req,res)=>{
    const {email,password}=req.body;
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
    const userExist=await userModel.findOne({email});
    if(!userExist){
        return res.status(404).json({success:false,message:"user does not exist!"});

    }
    try {
        const verifiedUser= await bcrypt.compare(password,userExist.password);
        if(verifiedUser){
             const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            sameSite: process.env.NODE_ENV==='production'?'none':'lax',
            secure:process.env.NODE_ENV==='production',
            maxAge: 7*24*60*60*1000,
             path:'/'


        })
            res.status(200).json({success:true,
                user:{
                    _id: userExist._id,
                    name: userExist.name,
                    email:userExist.email
                }
            });
        }
        else{
            return res.status(400).json({success:false,message:"invalid credentials"});
        }
       
        
    } catch (e) {
        res.status(500).json({success:false,message:e.message});
        
    }


}
export const logout=async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            sameSite:process.env.NODE_ENV==='production'?'none':'lax',
            secure:process.env.NODE_ENV==='production',
            path:'/'
        })
        res.status(200).json({success:true});
        
    } catch (e) {
        res.status(500).json({success:false,message:e.message})
        
    }
}