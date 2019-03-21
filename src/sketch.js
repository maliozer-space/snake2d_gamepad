var s;
var scl = 20;

var food;

function setup() {
  createCanvas(600,600);
  game = new Game();
  s = new Snake();
  frameRate(10);
  pickLocation();

}


var pickLocation = function(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(50);

  textSize(15);
  text('SCORE:'+ game.score, 480, 20);

  s.update();
  s.show();
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);

  if(s.eat(food)){
    game.score = s.total;
    pickLocation();
  }
}




function keyPressed() {
  if (keyCode === UP_ARROW){
    s.dir(0,-1);
  } else if(keyCode === DOWN_ARROW){
    s.dir(0,1);
  } else if(keyCode === LEFT_ARROW){
    s.dir(-1,0);
  } else if(keyCode === RIGHT_ARROW){
    s.dir(1,0);
  }
}