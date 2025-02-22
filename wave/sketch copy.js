let canvassize = 500;
let waves = [];

function setup() {
  angleMode(DEGREES)
  createCanvas(canvassize, canvassize);
  initWaves();
  blendMode(ADD);
}

function draw() {
  //background(0,0,100*tan(frameCount*0.1));
  clear(0,0,0);
  background(0,0,0,250);
  //translate(canvassize*0.4,canvassize*0.5)
  //rotate(frameCount);
  //var s = 0.5*(1+0.5*sin(frameCount));
  //scale(s,s,s);
  //clear(0,0,0);
  var sw = 3*(1+0.5*sin(frameCount*1));
  if(sw <= 0){
    initWaves();
  }



  strokeWeight(sw)
  waves1.forEach(w => {
    w.draw();
  });
  waves2.forEach(w => {
    w.draw();
  });

}

function initWaves(){
  waves1 = [];
  for(var i = 0; i <3;i++){
    waves1.push(new wave(canvassize));
  }

  waves2 = [];
  for(var i = 0; i <3;i++){
    waves2.push(new wave(canvassize));
  }
}