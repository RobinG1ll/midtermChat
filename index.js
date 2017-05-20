const express = require("express");
const port = process.env.PORT || 10000;
const path= require("path");

const bP = require("body-parser");
const session = require("express-session");

var pF = path.resolve(__dirname, "public");
var app = express();

const server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use("/scripts", express.static("build"));
app.use("/img", express.static("img"));
app.use("/css", express.static("css"));

app.use(bP.urlencoded({
    extended: true
}));

app.use(session({
    secret:"stuff",
    resave: true,
    saveUninitialized: true
}));

var allRooms = [];
var allDesc = [];
var allOpts = [];
var allCust = [];
var allChats = [];

app.get("/room/:roomindex", function(req, res){
    console.log(req.params.roomindex);
    var index = req.params.roomindex;
    req.session.roomId = index;
    res.sendFile(pF+"/room.html");
});

app.post("/room/roomId", function(req, res){
    if(req.session.profile == undefined){
        req.session.profile = {
            user:"Unknown",
            pic:"/img/unknown.png",
            gender:"blank"
        }
    };
    
    var obj = {
        roomId: req.session.roomId,
        roomName: allRooms[req.session.roomId],
        profile: req.session.profile
    };
    res.send(obj);
});

app.post("/chat", function(req, res){
    console.log(req.body);
    
    if(req.body.type == "read"){
        res.send({
            status:"success",
            chatArray:allChats[req.session.roomId] 
        });
    }
});

app.post("/profile", function(req,res){
    console.log(req.body);
    
    if(req.body.type = "post"){
        req.session.profile = req.body.profile;
        
        res.send({
            status:"success",
            profile: req.body.profile
        });
    }
});

app.post("/roomCRUD", function(req, res){
    console.log(req.body);

    if(req.body.type == "create"){
        allRooms.push(req.body.topic);
        
        allChats.push([])
        
        res.send({
            status:"success",
            topic:req.body.topic,
            index:allRooms.length-1
        });
    } else if(req.body.type == "read"){
        res.send({
            status:"success",
            roomArray:allRooms
        });
    }
});

app.get("/topic", function(req, res){
    res.sendFile(pF+"/topics.html");
});

app.get("/profile", function(req, res){
    res.sendFile(pF+"/profile.html");
});

app.get("/", function(req, res){
    res.sendFile(pF+"/main.html");
});

io.on("connection", function(socket){
    
    socket.on("join room", function(roomId){
        socket.roomId = "room"+roomId;
        socket.join(socket.roomId);
        console.log("join room");
        socket.id = roomId;
    });
    
    socket.on("send message", function(obj){
        allChats[socket.id].push(obj);
        io.to(socket.roomId).emit("create message", obj);
        console.log("send message");
    });
    
    socket.on("disconnect", function(){
    });
});

server.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    
    console.log("Server is running PORT "+port);
});