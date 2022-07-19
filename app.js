
let express=require("express");
let readline=require('readline');
let cors = require('cors');
let chatRouter=require('./router/chatRouter');
let mongoose=require("mongoose");
let url="mongodb://localhost:27017/lms";
let chatModel=require('./model/chatModel');

mongoose.connect(url).
then(result=>console.log('connected')).
catch(err=>console.log("error generated "+err));

let r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let app=express();
let http=require("http").Server(app);
let io=require("socket.io")(http);

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.use("/api",chatRouter);


io.on("connection",(socket)=>{
    console.log("Welcome client for chat application");
    
    socket.on("chatmessage",(msg)=>{
        console.log("msg form client: ",msg)
        let  chatMessage  =  new chatModel({sender:"server",chat_msg:msg});
        chatMessage.save();
    })
    r1.on("line",(input)=>{
        socket.emit("server",input)
        let  chatMessageServer  =  new chatModel({sender:"client",chat_msg:input});
        chatMessageServer.save();
    })
   
})

http.listen(3000,()=>console.log("server is listening on port 3000"));



