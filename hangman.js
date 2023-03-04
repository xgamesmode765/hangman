let input, button;

let teams, teamsButton;
let numOfTeams;
let r,g,b,a;

let teamScores = {};
let selectedTeam = 1;


let phrase = "1 Corinthians 15:58 Therefore my beloved brethren be steadfast immovable always abounding in the work of the Lord knowing that your labor is not in vain in the Lord"
phrase = phrase.toLowerCase();
let tokens = phrase.split(" ");
let correctGuesses = Array.apply(null, Array(tokens.length - 1)).map(function () {});

let guessFlag = null;

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  input = createInput();
  input.position(windowWidth/2-150, windowHeight-400);
  
  button = createButton('Guess!');
  button.position(input.x + input.width, input.y);
  button.mousePressed(checkGuess);
  
  
  teams = createInput();
  teams.position(windowWidth/2-500, windowHeight-400)
  
  teamsButton = createButton('Create teams');
  teamsButton.position(teams.x + teams.width, teams.y);
  teamsButton.mousePressed(setTeams);
  

  console.log(phrase);
  console.log(tokens);

}

function setTeams() {
  numOfTeams = teams.value();
  for (var i = 0; i < numOfTeams; i++) {
    teamScores[i+1] = 0;
  }
  console.log(teamScores);
  console.log(numOfTeams);
}

function checkGuess() {
  var guess = input.value();
  guess.toLowerCase();
  console.log(guess);
  
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] == guess && correctGuesses[i] == null) {
      correctGuesses[i] = guess;
      guessFlag = true;
      teamScores[selectedTeam] += 1;
      if (selectedTeam >= numOfTeams) {
        selectedTeam = 1;
      } else {
        selectedTeam += 1;
      }
      console.log(i)
      return i;
    }
  }
  
  if (selectedTeam >= numOfTeams) {
    selectedTeam = 1;
  } else {
    selectedTeam += 1;
  }
  guessFlag = false;
  return false;
}



function draw() {
  background(0);
  
  if (guessFlag) {
    textSize(64);
    fill(0,255,0);
    stroke(0,255,0);
    text("Correct", windowWidth/2, 150);
  } else if (guessFlag == false) {
    textSize(64);
    fill(255,0,0);
    stroke(255,0,0);
    text("Wrong", windowWidth/2, 150);
  }
  
  
  var x = 50;
  var y = windowHeight/2 - 200
  var x2 = 120;
  var y2 = windowHeight/2 - 200
  
  var index = 0;
  for (var i = 0; i < tokens.length/2; i ++) {
    stroke(255);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(correctGuesses[index], x + ((x2-x)/2), y - 15);
    line(x, y, x2, y2);
    x += tokens[index].length + 80;
    x2+= tokens[index].length + 80;
    index++;
  }
  
  
  x = 50
  x2= 120
  y += 200
  y2 += 200
  
  for (var j = 0; j < tokens.length/2-1; j ++) {
    text(correctGuesses[index], x + ((x2-x)/2), y - 15);
    line(x, y, x2, y2);
    x += tokens[index].length + 80;
    x2+= tokens[index].length + 80;
    index++;
  }
  
  let offset = 0;
  for (var c = 1; c <= numOfTeams; c++) {
    
    if (c == selectedTeam) {
      stroke(255);
      fill(255,0,0);
      rect(50 + offset, windowHeight - 250, 55,55);
    } else {
      stroke(255);
      fill(0,255,0);
      rect(50 + offset, windowHeight - 250, 55,55);
    }
    stroke(0);
    fill(0);
    textSize(32);
    text(teamScores[c], 75+offset, windowHeight-220);
    textSize(24);
    stroke(255);
    fill(255);
    text(c, 75+offset, windowHeight-175);
    offset += 70;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
