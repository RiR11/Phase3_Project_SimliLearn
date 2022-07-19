let express=require("express");
let router=express.Router();
let chatController=require('../controller/chatController');

router.post("/chatsave",chatController.storeChat);
router.get("/showchat",chatController.showAllchat);
router.get("/downloadchat",chatController.downloadchat)

module.exports=router;

