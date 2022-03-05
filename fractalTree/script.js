
let width = 500;
let height = 500;

let scale = 0.8;

let repeat = 10;

let length =80;
let rotateAngle = 20;

let colorstep = repeat - 2;
let colordrad = 15;

let angleRandomRange = 15;
let lengthScaleRandomRage = 0.3;


let flowesRandomRange = 10;

function setup() {
    createCanvas(width, height);
    background(0);
    
    angleMode(DEGREES);
    stroke(255,255,255);
    strokeWeight(2);

}

function draw(){
    let firstAngle = random(-angleRandomRange,angleRandomRange);
    tree(width*0.5, height, length,firstAngle, repeat);
    noLoop();
}
   
function tree(x,y,len,angle, step) {
    //main
    if(step < colorstep){
        let gb = 255 - (colorstep-step)*colordrad;
        stroke(255,gb,gb);
        fill(255,gb,gb);

    }

    translate(x, y);
    rotate(angle);
    line(0,0,0,-len);

    if(step < colorstep){
        noStroke();
        drawFlowers();
        drawFlowers();
        drawFlowers();
    }

    if(step > 0){
        //right branch
        push();
        tree(0,-len,
            len*scale * getLengthScaleRandomRange(),
            - rotateAngle -  getAngleRandomRange(), 
            step-1);
        pop();

        //left branch
        push();
        tree(0,-len,
             len*scale * getLengthScaleRandomRange(), 
            + rotateAngle + getAngleRandomRange(), 
            step-1);
        pop();
    }

   

    
}

function drawFlowers(){
    let size = random(2,10);
    let x = random(-10,10);
    let y = random(-10,10);
    circle(x,y,size);
}

function getLengthScaleRandomRange(){
    return random(1-lengthScaleRandomRage, 1 + lengthScaleRandomRage);
}

function getAngleRandomRange(){
    return random(-angleRandomRange,angleRandomRange);
}
