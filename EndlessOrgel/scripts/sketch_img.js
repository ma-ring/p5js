let canvas = 500;
let diskImage;
let imgFile ;
let pScanner;
let musigGenerator;

let fps = 30;
let qbm = 120;
let orgenstep = 60/120*1000;
let stepSQ = 4;
let genInterval = 2000;
let stepinterval;
let genStepNum;

let lastAttackTime = 0;
let lastgenTime = 0;



function preload(){
  imgFile = loadImage("hokusai.jpg");
}


function setup() {
  createCanvas(canvas, canvas);
  pScanner = new pixelScanner(canvas);
  musicGenerator = new genMusic();
  var w = imgFile.width;
  var h = imgFile.height;
  var size = w > h ? h : w;
  diskImage = createGraphics(size,size);
  diskImage.beginClip();
  diskImage.circle(size*0.5,size*0.5,size,size);
  diskImage.endClip();
  diskImage.image(imgFile,-(w-size)*0.5,-(h-size)*0.5);
  noStroke();

  frameRate(fps);
  orgenstep = round(orgenstep);
  stepinterval = 60/(qbm*stepSQ);
  genStepNum = floor(genInterval / stepinterval/1000)-5;
}

function draw() {
  var ct = millis();
  push();
  background(0);
  translate(canvas*0.5,canvas*0.5);
  rotate(frameCount*0.005);
  image(diskImage,-canvas*0.5,-canvas*0.5,canvas,canvas);
  pop();

  if(ct - lastAttackTime > orgenstep ){
    pScanner.scanPixel();
    lastAttackTime = ct
  }

  if(ct - lastgenTime > genInterval){
    getMusic();
    lastgenTime = ct;
  }

  pScanner.draw();
  
}

function mouseClicked(){
  //getMusic();
}

function getMusic() {
  // シード NoteSequence の定義（絶対タイミング）
  var notes = pScanner.notes;
  var tt = round((pScanner.count+1)*0.5);
  const seed = {
    notes: notes,
    totalTime: tt,
    tempos: [{ time: 0, qpm: qbm }]
  };
  pScanner.notes = [];
  pScanner.count = 0;
  

  // オリジナルクラスの generate() を呼び出して生成＆再生
  musicGenerator.generate(seed, genStepNum, 1,stepSQ).then((finalSequence) => {
    musicGenerator.play(finalSequence);
  });
}
