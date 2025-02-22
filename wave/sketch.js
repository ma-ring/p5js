let canvassize = 500;
let waves = [];
let num = 20;
function setup() {
  frameRate(5);
  angleMode(DEGREES)
  createCanvas(canvassize, canvassize);
  initWaves();
  strokeWeight(5);

}

function draw() {
  background(0,0,0);
  waves.forEach(w => {
    w.draw();
  });


}

function initWaves(){
  waves = [];
  var amp = canvassize / num;
  for(var i = 0; i <num+1;i++){
    waves.push(new wave(canvassize,amp*(i),amp));
  }

  
}