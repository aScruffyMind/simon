// Set variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var randomNumber = null;
var randomChosenColour = buttonColours[randomNumber];
var started = false;

// Listen for keypress to start game.
$(document).keydown(function(option) {
  if (started === false) {
    if (option.key === " ") {
      console.log("The game has begun!");
      started = true;
      randomNumber = nextSequence();
      randomChosenColour = buttonColours[randomNumber];
    }
  }
});

// Button Press animation and sound
function buttonPress(currentColor) {
  if (started == true) {
    switch (currentColor) {
      case "green":
        var greenSound = new Audio("sounds/green.mp3");
        greenSound.play();
        break;
      case "blue":
        var blueSound = new Audio("sounds/blue.mp3");
        blueSound.play();
        break;
      case "red":
        var redSound = new Audio("sounds/red.mp3");
        redSound.play();
        break;
      case "yellow":
        var yellowSound = new Audio("sounds/yellow.mp3");
        yellowSound.play();
        break;
      default:
        console.log(name);
    }
    $("div ." + currentColor).addClass("pressed");
    setTimeout(function() {
      $("div ." + currentColor).removeClass("pressed");
    }, 100);
  }
}

// Generate the next sequence in the game pattern.
function nextSequence() {
  if (started == true) {
    level++;
    $("#level-title").html("Level " + level);
    var rando = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColours[rando]);
    console.log("nextSequence ran");
    buttonPress(buttonColours[rando]);
    userClickedPattern = [];
    return rando;
  }
}

// Process clicked buttons
$("div .btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  // buttonPress(userChosenColour); // moved to execute after correct answer confirmed
  checkAnswer((userClickedPattern.length));
});

// Check if the button press matches the sequence
function checkAnswer(currentLevel) {
  if (started == true) {
    console.log(currentLevel);
    // Match
    if (userClickedPattern[(currentLevel - 1)] === gamePattern[(currentLevel - 1)]) {
      buttonPress(userClickedPattern[(currentLevel -1)]);
      console.log("Seq: " + gamePattern[(currentLevel - 1)] + " | Clicked: " + userClickedPattern[(currentLevel - 1)]);
      if (userClickedPattern.length === gamePattern.length) {
        console.log("The sequence is complete");
        setTimeout(nextSequence, 1000);
      }
      // No Match
    } else {
      console.log("nope!");
      var gameOverSound = new Audio("sounds/wrong.mp3");
      gameOverSound.play();
      $("#level-title").html("Game Over!<br />Press [space] to restart.");
      $(document.body).addClass("game-over");
      setTimeout(function() {
        $(document.body).removeClass("game-over");
      }, 200);
      startOver();
    }
  }
}

// Start the game over
function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
