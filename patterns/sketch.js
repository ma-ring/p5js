colors = ["#D3ECA7","#A1B57D","#B33030","#19282F"];


let width = 500;
let height = 500;
let W = 100;

var patterns =[];

function setup() {
    createCanvas(width, height);

    fill(colors[0]);
    rect(0,0,width,height);
    drawPatterns();
}

function draw() {
    
}


function drawPatterns(){
    for(var x = 0;  x < width; x += W){
        for(var y = 0; y < height; y += W){
            pattern(x,y,W);
        }
    }
}

function pattern(x, y, w){
    var pg = createGraphics(w, w);
    pg.noStroke();

    shuffle(colors, true)
    pg.fill(colors[0]);
    pg.rect(0, 0, w, w);
    
    var p = floor(random(0,5));
    
    switch(p){
        case 0:{
            //dz
            
            var dW = W * 0.2;
            pg.fill(colors[1]);
            
            for(var dx = dW; dx <  W; dx += dW){
                for(var dy = dW; dy < W; dy += dW){
                    pg.circle(dx, dy, dW * 0.5);
                }    
            }
            
        }break;

        case 1:{
            //round
            
            pg.strokeWeight(W * 0.1);
            pg.stroke(colors[1]);

            pg.noFill();
            var cx = W * 0.5; var cy =  W * 0.5;
            pg.circle(cx, cy, W * 0.3);
            pg.circle(cx, cy, W * 0.7);
            pg.circle(cx, cy, W * 1.2);

            
        }break;

        case 2:{
            //border
            
            pg.stroke(colors[1]);
            var dW = W * 0.2;
            pg.strokeWeight(dW/2);

            for(var dx = dW; dx < W; dx +=dW){
                pg.line(dx, 0 , dx, W);
            }
            
        }break;

        case 3:{
            //splain
            
            //stroke(colors[1]);
            var dW = W * 0.3;
            pg.fill(colors[1]);
            for(var dx = dW; dx <  W; dx += dW*2){
                for(var dy = dW; dy < W; dy += dW*2){
                    pg.rect(dx,dy,dW,dW);
                }
            }
            
        }break;
        case 4:{
            //triangle
            
            pg.fill(colors[1]);
            pg.triangle(0, 0, 0, W, W, 0);
            
        }break;
    }

    image(pg,x,y);
    
}