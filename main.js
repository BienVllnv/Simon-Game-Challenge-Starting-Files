const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(function() {

    if(!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

   playSound(userChosenColor);

   animatePress(userChosenColor);

   checkAnswer(userClickedPattern.length-1);
});

const checkAnswer = (currentLevel) => {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000);
        } 
    } else {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key To Restart")

        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        
        startOver();
    } 
}

const nextSequence = () => {

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
``
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
   playSound(randomChosenColor);
}

const playSound = (e) => {
    const audio = new Audio("sounds/" + e + ".mp3");
    audio.play();
}

const animatePress = (currentColor) => {

    $("#" + currentColor).addClass("pressed");

    setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
}

const startOver = () => {
    gamePattern = [];
    level = 0;
    started = false;
}



