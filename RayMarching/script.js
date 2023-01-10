let CANVAS = 800;
let rayShader;
let count = 0;

let myPointX,myPointY;
let a, b;
function preload(){
    rayShader = loadShader("raymarching.vert","raymarching.frag");
}

function setup(){
    createCanvas(CANVAS, CANVAS,WEBGL);
    background(0);
    noStroke();


    myPointX  = 0;
    myPointY  = 0;

    a = 1;
    b = 2;

    
}

function draw(){
   

    count += 0.01;

    myPointX = CANVAS*0.3 * cos(a *count);
    myPointY = CANVAS*0.3 * sin(b *count);

    //a += cramp(0.1 *  noise(count,a*0.01), 0, 1,-0.5,0.5);
    //b = a + random(1,2);//2 * noise(count,b*0.01);

    
    shader(rayShader);
    rayShader.setUniform("time",count );
    rayShader.setUniform("mouseX",(myPointX));
    rayShader.setUniform("mouseY",(myPointY));

    rect(-CANVAS*0.5,-CANVAS*0.5,CANVAS,CANVAS);

    //resetShader();
    //background(0);
    //translate(CANVAS * 0.5, CANVAS * 0.5);


    ///fill(255);
    //circle(myPointX,myPointY,10);

}