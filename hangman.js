let input, button;

let teams, teamsButton;
let numOfTeams;
let r,g,b,a;

let teamScores = {};
let selectedTeam = 1;


let phrase = "1  C o r i n t h i a n s  15:58  T h e r e f o r e  m y  b e l o v e d  b r e t h r e n  b e  s t e a d f a s t  i m m o v a b l e  a l w a y s  a b o u n d i n g  i n  t h e  w o r k  o f  t h e  L o r d  k n o w i n g  t h a t  y o u r  l a b o r  i s  n o t  i n  v a i n  i n  t h e  L o r d"
phrase = phrase.toLowerCase();
let tokens = phrase.split(" ");
let correctGuesses = Array.apply(null, Array(tokens.length - 1)).map(function () {});

let guessFlag = null;

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  input = createInput();
  input.position(windowWidth/2-150, windowHeight-100);
  
  button = createButton('Guess!');
  button.position(input.x + input.width, input.y);
  button.mousePressed(checkGuess);
  
  
  teams = createInput();
  teams.position(windowWidth/2-500, windowHeight-100)
  
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
  guessFlag = false;
  
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] == guess && correctGuesses[i] == null) {
      correctGuesses[i] = guess;
      guessFlag = true;
      teamScores[selectedTeam] += 1;
      console.log(i)
    }
  }
  
  if (selectedTeam >= numOfTeams) {
    selectedTeam = 1;
  } else {
    selectedTeam += 1;
  }
}



function draw() {
  background(204, 255, 255 );
  
  if (guessFlag) {
    textSize(64);
    fill(0,255,0);
    stroke(0,255,0);
    text("Correct", windowWidth/2, 50);
  } else if (guessFlag == false) {
    textSize(64);
    fill(255,0,0);
    stroke(255,0,0);
    text("Wrong", windowWidth/2, 50);
  }
  
  
  var x = 50;
  var y = windowHeight/2 - 350
  var x2 = 120;
  var y2 = windowHeight/2 - 350
  
  var index = 0;
  for (var i = 0; i < tokens.length/3-5; i ++) {
    stroke(0);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(correctGuesses[index], x + ((x2-x)/2)-6, y - 15);
    line(x, y, x2-60, y2);
    x += 25;
    x2+= 25;
    index++;
  }
  
  
  x = 50
  x2= 120
  y += 200
  y2 += 200
  
  for (var j = 0; j < tokens.length/3 + 5 - 3; j ++) {
    text(correctGuesses[index], x + ((x2-x)/2)-6, y - 15);
    line(x, y, x2-60, y2);
    x += 25;
    x2+= 25;
    index++;
  }
  
  x = 50
  x2= 120
  y += 200
  y2 += 200
  
  for (var k = 0; k < tokens.length/3 + 3; k ++) {
    text(correctGuesses[index], x + ((x2-x)/2)-6, y - 15);
    line(x, y, x2-60, y2);
    x += 25;
    x2+= 25;
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
    stroke(0);
    fill(0);
    text(c, 75+offset, windowHeight-175);
    offset += 70;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
