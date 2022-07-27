var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var startGame = false;
var level = 0;

$(document).keydown(function () {
  if (startGame === false) {
    startGame = true;
    nextSequence();
  }
});

// User clicks a button

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];

  $("#" + randomChosenColor)
    .animate(
      {
        opacity: 0.2,
      },
      75
    )
    .animate(
      {
        opacity: 1,
      },
      75
    );

  var buttonSound = new Audio("sounds/" + randomChosenColor + ".mp3");
  buttonSound.play();

  gamePattern.push(randomChosenColor);

  level++;
}

function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("Failed");
    playSound("wrong");
    $("h1").text("Game Over. Press Any Key to Restart.");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  startGame = false;
  userClickedPattern = [];
}
