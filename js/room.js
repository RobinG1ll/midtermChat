$(document).ready(function(){
    $.ajax({
        url:"/room/roomId",
        type:"post",
        success:function(res){
            var stat = document.getElementById("status");
            stat.innerHTML = "You are in room "+res.roomId+": "+res.roomName.room;
            
            initSockets(res.roomId, res.profile);
        }
    });
    
    $.ajax({
        url:"/chat",
        type:"post",
        data:{
            type:"read"
        },
        success:function(res){
            if(res.status == "success"){
                var chats = res.chatArray;
                
                for(i=0; i < chats.length; i++){
                    createMessage(chats[i]);
                }
            }
            
        }
    });
    
});


function initSockets(roomId, profile){
    
    var socket = io();
    
    socket.emit("join room", roomId);
    
    document.getElementById("send").addEventListener("click", function(){ 
        var obj = {
            profile:profile,
            msg: document.getElementById("msg").value
        };
                
        socket.emit("send message", obj);
    });
    
    socket.on("create message", function(obj){
        createMessage(obj);
    });   
}

function createMessage(chatInfo){
        var display = document.getElementById("disp");        
        var newMsg = document.createElement("div");
        display.prepend(newMsg);
        newMsg.className = "msg-New";
        
        var userImg = document.createElement("img");
        newMsg.appendChild(userImg);
        userImg.src = chatInfo.profile.pic;
        userImg.className = "msg-Img";
    
        if(chatInfo.profile.gender == "Male"){
            userImg.style.backgroundColor = "#FF00F7";
        }else if(chatInfo.profile.gender == "Female"){
            userImg.style.backgroundColor = "#6278FF";
        }else if(chatInfo.profile.gender == "blank"){
            userImg.style.backgroundColor = "#00FF4D";
        }
    
        var username = document.createElement("div");
        newMsg.appendChild(username);
        username.innerHTML = "Username: "+ chatInfo.profile.user;
        username.className = "msg-User";
        
        if(chatInfo.profile.gender == "Male"){
            username.style.backgroundColor = "#FF00F7";
        }else if(chatInfo.profile.gender == "Female"){
            username.style.backgroundColor = "#6278FF";
        }else if(chatInfo.profile.gender == "blank"){
            username.style.backgroundColor = "#00FF4D";
        }
        
        var usermsg = document.createElement("span");
        newMsg.appendChild(usermsg);
        usermsg.innerHTML = chatInfo.msg;
        usermsg.className = "msg-Post";
        
        if(chatInfo.profile.gender == "Male"){
            usermsg.style.backgroundColor = "#FF00F7";
        }else if(chatInfo.profile.gender == "Female"){
            usermsg.style.backgroundColor = "#6278FF";
        }else if(chatInfo.profile.gender == "blank"){
            usermsg.style.backgroundColor = "#00FF4D";
        }
}