$(document).ready(function(){
    
    document.getElementById("submit").addEventListener("click", function(){
        $.ajax({
            url:"/profile",
            type:"post",
            data:{
                profile:{
                    user: document.getElementById("userName").value,
                    pic: document.getElementById("proPic").value,
                    gender: document.getElementById("sex").value
                },
                type:"post"
            },
            success:function(res){
                if(res.status == "success"){
                    var update = document.getElementById("updater");
                    document.getElementById("picture").style.backgroundImage = "url("+res.profile.pic+")";

                    update.innerHTML = "Your profile has been updated "+res.profile.user+"!";
                    update.style.top = "0px";
                }
            }  
        });
    });
});