let canvas = 500;
let diskImage;
let imgFile ;
let pScanner;

function preload(){
  imgFile = loadImage("hokusai.jpg");
}
function setup() {
  createCanvas(canvas, canvas);
  pScanner = new pixelScanner(canvas);

  var w = imgFile.width;
  var h = imgFile.height;
  var size = w > h ? h : w;
  diskImage = createGraphics(size,size);
  diskImage.beginClip();
  diskImage.circle(size*0.5,size*0.5,size,size);
  diskImage.endClip();
  diskImage.image(imgFile,-(w-size)*0.5,-(h-size)*0.5);
  noStroke();
}

function draw() {
  push();
  background(0);
  translate(canvas*0.5,canvas*0.5);
  rotate(frameCount*0.005);
  image(diskImage,-canvas*0.5,-canvas*0.5,canvas,canvas);
  pop();

  if(frameCount % 20 == 0)
    pScanner.scanPixel();

  pScanner.draw();
}
