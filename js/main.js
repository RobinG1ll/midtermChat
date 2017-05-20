$(document).ready(function(){
    console.log("jquery is loaded");
    
    document.getElementById("topic").addEventListener("click", function(res){
        console.log(res);
        $.ajax({
            url:"/topic",
            success:function(res){
                location.href = "/topic"
            }
        });
    });
    
    document.getElementById("profile").addEventListener("click", function(res){
        console.log(res);
        $.ajax({
            url:"/profile",
            success:function(res){
                location.href = "/profile"
            }
        });
    });
});