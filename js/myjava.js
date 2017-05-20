$(document).ready(function(){
    var postDiv = document.getElementById("allRooms");
	postDiv.className = "postDiv";
    
    $.ajax({
        url:"/roomCRUD",
        type:"post",
        data:{
            type:"read"
        },
        success:function(res){
            if(res.status == "success"){
                    var rooms = res.roomArray;

                    for(var i = 0; i<rooms.length; i++){
						var newPost = document.createElement("div");
						postDiv.prepend(newPost);
						newPost.className = "newPost";
						
						var imgDiv = document.createElement("img");
						newPost.appendChild(imgDiv);
						imgDiv.className = "imgnewDiv";
						
						if(rooms[i].option == "opinion"){
							imgDiv.style.backgroundImage = "url(/img/opin.png)";
							imgDiv.style.backgroundSize = "contain";
						}else if(rooms[i].option == "question"){
							imgDiv.style.backgroundImage = "url(/img/q.png)";
							imgDiv.style.backgroundSize = "contain";
						}else if(rooms[i].option == "help"){
							imgDiv.style.backgroundImage = "url(/img/help.png)";
							imgDiv.style.backgroundSize = "contain";
						}else if(rooms[i].option == "cust"){
							imgDiv.style.backgroundImage = "url("+rooms[i].custom+")";
							imgDiv.style.backgroundSize = "contain";
						}else if(rooms[i].option == "blank"){
							imgDiv.style.backgroundImage = "url(/img/no.png)";
							imgDiv.style.backgroundSize = "contain";
						}
						
						var titleDiv = document.createElement("div");
						newPost.appendChild(titleDiv);
						titleDiv.className = "titlenewDiv";
						titleDiv.innerHTML = rooms[i].room;
						
						var descDiv = document.createElement("div");
						newPost.appendChild(descDiv);
						descDiv.className = "descDiv";
						descDiv.innerHTML = rooms[i].description;

                        newPost.myindex = i;
                        newPost.addEventListener("click", function(){
                            location.href = "/room/"+this.myindex;
                    });
                }
            }
        }
    });
    
    document.getElementById("option").addEventListener("change", function(){
        var custInput = document.getElementById("cusURL");
        
        if(this.value == "cust"){
           custInput.disabled = false;
       }else{
           custInput.disabled = true;
       }
    });
    
    document.getElementById("create").addEventListener("click", function(){
        $.ajax({
            url:"/roomCRUD",
            type:"post",
            data:{
                type:"create",
                topic:{
                room: document.getElementById("room").value,
                description: document.getElementById("description").value,
                option: document.getElementById("option").value,
                custom: document.getElementById("cusURL").value
                }
            },
            success:function(res){
                var newPost = document.createElement("div");
                postDiv.prepend(newPost);
				newPost.className = "newPost";
                
                var imgDiv = document.createElement("img");
                newPost.appendChild(imgDiv);
				imgDiv.className = "imgnewDiv";
                
                if(res.topic.option == "opinion"){
                    imgDiv.style.backgroundImage = "url(/img/opin.png)";
                    imgDiv.style.backgroundSize = "contain";
                }else if(res.topic.option == "question"){
                    imgDiv.style.backgroundImage = "url(/img/q.png)";
                    imgDiv.style.backgroundSize = "contain";
                }else if(res.topic.option == "help"){
                    imgDiv.style.backgroundImage = "url(/img/help.png)";
                    imgDiv.style.backgroundSize = "contain";
                }else if(res.topic.option == "cust"){
                    imgDiv.style.backgroundImage = "url("+res.topic.custom+")";
                    imgDiv.style.backgroundSize = "contain";
                }else if(res.topic.option == "blank"){
                    imgDiv.style.backgroundImage = "url(/img/no.png)";
                    imgDiv.style.backgroundSize = "contain";
                }
                
                var titleDiv = document.createElement("div");
                newPost.appendChild(titleDiv);
                titleDiv.className = "titlenewDiv";
                titleDiv.innerHTML = res.topic.room;
                
                var descDiv = document.createElement("div");
                newPost.appendChild(descDiv);
				descDiv.className = "descDiv";
                descDiv.innerHTML = res.topic.description;
                
                newPost.myindex = res.index;
                newPost.addEventListener("click", function(){
                    location.href = "/room/"+this.myindex;
                });
            }
        });
    });
});