import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    seen:{type:Boolean,default:false},

    content:{type:String,required:function(){
        return this.type==="text";
    }},
    type: {type:String,default:"text",enum:["text","image"]},
    mediaUrl:{type:String},

},
{timestamps:true})
messageSchema({sender:1,receiver:1,createdAt:1})
const messageModel = mongoose.model('Message',messageSchema);
export default messageModel;