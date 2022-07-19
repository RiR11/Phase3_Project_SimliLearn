let chatModel=require("../model/chatModel");
let fs = require("fs");
let storeChat=(req,res)=>{
    let data=req.data;
    chatModel.insertMany(data,(err,result)=>{
        if(!err){
            console.log("chat inserted in db");
        }else{
            console.log(err+ " error generated ")
        }
    })
}
let showAllchat=(req,res)=>{
    chatModel.find({},(err,result)=>{
        if(!err){
            res.json(result);
        }
        else{
            res.send("no record found");
        }
    })
}

let downloadchat=(req,res)=>{

    chatModel.find({},(err,result)=>{
        if(!err){
            res.json(result);
              
            fs.writeFile("chatLog.json",JSON.stringify(result),(err)=> {
                if(!err){
                    console.log("Record stored in file");
                }
            })
        }
    else{
        res.send("no record found");
    }
})

}

module.exports={storeChat,showAllchat,downloadchat};




