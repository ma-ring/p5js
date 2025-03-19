let canvas = 500;
let diskImage;
let imgFile ;
let pScanner;
let musigGenerator;

let fps = 30;
let qbm = 120;
let orgenstep = 60/120*1000;
let stepSQ = 4;
let genInterval = 5000;
let stepinterval;
let genStepNum;

let lastAttackTime = 0;
let lastgenTime = 0;

let cap;
let w,h,size;

let mCanvas;
let mProcessor;
let mProcessor1;

function preload(){
  cap = createVideo("resources/astrodance.mov");// createCapture(VIDEO);
  cap.volume(0);
  cap.hide();
  w = 1920;//cap.width;
  h = 1080;//cap.height;

}

function setup() {
  frameRate(fps);
  cap.loop();
  mCanvas = createCanvas(canvas, canvas);
  pScanner = new pixelBandScanner(canvas);
  musicGenerator = new genMusic();
  size = canvas;//w > h ? h : w;

  w = w*size/h;
  h = size;

  diskImage = createGraphics(size,size);

  noStroke();

  orgenstep = round(orgenstep);
  stepinterval = 60/(qbm*stepSQ);
  genStepNum = floor(genInterval / stepinterval/1000)-5;

  mProcessor = new imgProcess(size);
  mProcessor.setupDOF(pScanner.step);
  
  mProcessor1 = new imgProcess(size);
  mProcessor1.setupBGDIFF();

  blendMode(ADD);
}

function draw() {
  var ct = millis();
  clear(0);
  push();
  diskImage = mProcessor1.process(mCanvas,cap);

  image(cap,(h-w)*0.5,0,w,h);

  image(diskImage,0,0);
  diskImage = mProcessor.process(mCanvas,cap);

  


  pop();

  if(ct - lastAttackTime > orgenstep ){
    pScanner.scanPixel(diskImage);
    lastAttackTime = ct
  }

  if(ct - lastgenTime > genInterval){
    getMusic();
    lastgenTime = ct;
  }

  pScanner.draw();
  
}

function mouseClicked(){
  console.log("sound")
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
