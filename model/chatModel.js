
let mongoose=require("mongoose");
mongoose.pluralize(null);
let readline=require("readline");
let chatSchema=new mongoose.Schema({
    sender:String,
    chat_msg:String,
    timestamps:{ type: Date, default: Date.now }
});
let chatModel=mongoose.model('chat',chatSchema);

module.exports=chatModel;

