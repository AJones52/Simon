var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function ()
{
  if (!started)
  {
    $("#level-title").text("Level: " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function()
  {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });

  function checkAnswer(currentLevel) /*Verifies the user input matches the randomly selected color*/
  {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
      if (userClickedPattern.length === gamePattern.length)
        {
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }

    else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function ()
        {
          $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
  }

function nextSequence() /*Main function of the game; Randomly chooses the next color in the sequence*/
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level: " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

  function playSound(name) /*Each button is assigned a sound*/
  {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor) /*Displays small animation for clicking a button*/
  {
    $("#" + currentColor).addClass("pressed");
      setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
      }, 100);
  }

  function startOver() /*Restarts the game*/
  {
    level = 0;
    started = false;
    gamePattern.length = [];
  }
