import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{type: String, required: true,trim:true},
    email:{type:String,required:true,unique:true,trim:true,lowercase:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:""},
    lastSeen:{type:Date,default:null},
    isOnline:{type:Boolean,default:false}



},
{
    timestamps:true
})
const userModel = mongoose.model("User",userSchema);
export default userModel