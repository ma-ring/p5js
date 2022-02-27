let img;

let gridSize = 15;
let gridW;
let gridH;
function preload(){
   //img = loadImage('https://live.staticflickr.com/1515/26653285795_311001ee9b.jpg');
   img = loadImage("image1.png");
   //img = loadImage("https://ja.wikipedia.org/wiki/%E3%83%A2%E3%83%8A%E3%83%BB%E3%83%AA%E3%82%B6#/media/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg");
   
}

function setup(){
    //img.resize(img.width/2,img.height/2);
    createCanvas(img.width, img.height);

    gridW = floor(img.width / gridSize);
    gridH = floor(img.height / gridSize);

    background(255);
    noStroke();
    //image(img,0,0);
    img.loadPixels();
}

function draw(){
    //blendMode(ADD);
    
    let x = random(0, gridW) * gridSize;
    let y = random(0, gridH) * gridSize;
    let r = random(10, 20);
    var dr= 0, dg = 0, db = 0;

    for(var dx = x; dx < x + r ;dx++){
        for(var dy = y; dy < y + r ;dy++){
            let pix = img.get(x, y); 
            dr += pix[0];
            dg += pix[1];
            db += pix[2];

        }
    }

    dr /= r*r;
    dg /= r*r;
    db /= r*r;
    let sum = dr + db + dg;
    let R = dr /sum;
    let G = dg /sum;
    let B = db /sum;
    var d = r/2;
    
    if(R > 0.6){
        fill(255,100,100);
        ellipse(x , y , r  , r );
    }
    else if(G > 0.6){
        fill(100,255,100 );
        ellipse(x, y ,  r  , r);
    }
    else if(B > 0.6){
        fill(100,100,255 );
        ellipse(x , y,  r  , r );
    }
    else if(R + G > 0.8){
        fill(255,255,100 );
        ellipse(x , y,  r  , r);
    }
    else if(G + B > 0.8){
        fill(100,255,255 );
        ellipse(x , y,  r  , r );
    }
    else if(R + B > 0.8){
        fill(255,100,255 );
        ellipse(x , y,  r  , r );
    }
    else
    {
        fill(255,100,100);
        ellipse(x+d , y+d , r * R , r  * R);
        fill(100,255,100 );
        ellipse(x, y+d , r* G , r* G );
        fill(100,100,255 );
        ellipse(x+d , y, r* B , r * B);
    }


}