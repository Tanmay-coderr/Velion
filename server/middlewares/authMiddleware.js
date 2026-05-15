import jwt from 'jsonwebtoken';

const authMiddleware=(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success:false,message:"no token, no authorization"});

    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
        
    } catch (e) {
        return res.status(401).json({success:false,message:e.message});
        
    }
}
export default authMiddleware;