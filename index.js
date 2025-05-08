var level=0;
var buttoncolours=["red","green","blue","yellow"]
var started=false;
var gamepattern=[];
var userclickedpattern=[];
$(document).keypress(function(){
    if(!started){
        // $("#level-title").text("Level"+level);
        nextsequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userchosencolour=$(this).attr("id");
    userclickedpattern.push(userchosencolour);
    playsound(userchosencolour);
    animatePress(userchosencolour);
    checkAnswer(userclickedpattern.length-1);
})
function nextsequence(){
   
        level++;
        userclickedpattern=[]
        $("#level-title").text("Level "+level);
    var randomchosen_number=Math.floor(Math.random()*4);
    var randomchosencolour=buttoncolours[randomchosen_number];
    gamepattern.push(randomchosencolour);
    $('#'+randomchosencolour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchosencolour);
}
function playsound(colour){
    var audio=new Audio("sounds/"+colour+".mp3");
audio.play();   
}
function animatePress(colour){
$("#" + colour).addClass("pressed");
setTimeout(function(){
    $("#" + colour).removeClass("pressed")
},100);
}
function checkAnswer(currentlevel){
    if(gamepattern[currentlevel]===userclickedpattern[currentlevel]){
        if(userclickedpattern.length===gamepattern.length){
                    setTimeout(function(){
                        nextsequence()
                    },1000);
        }
    } else{
            playsound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){
                $("body").removeClass("game-over")},200);
                startOver();
        }
    }
function startOver(){
    level=0;
    gamepattern=[];
    started=false;
}