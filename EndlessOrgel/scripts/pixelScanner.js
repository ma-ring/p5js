class pixelScanner{
    
    constructor(canvassize){
        this.canvassize = canvassize;
        this.scanpoints = [];
        this.step = (int)((this.canvassize*0.5) / CELL);
        for(var y = this.canvassize*0.5; y < this.canvassize; y+=this.step ){
            this.scanpoints.push([this.canvassize*0.5,y,false]);
        }
        this.pointsNum = this.scanpoints.length;
        

        soundinit();
    }

    scanPixel(){
        loadPixels();
        var r,g,b,v;
        var idx;
        var i = 0;
        this.scanpoints.forEach(p => {
            idx = 3*(p[0] + p[1]*this.canvassize);
            r = pixels[idx];
            g = pixels[idx+1];
            b = pixels[idx+2];

            v = 0.2126*r + 0.7152*g + 0.0722*b;
            if(v > 230){
                oscs[i].play()
                p[2] = true;
            }
            else{p[2] = false;}
            i++;

        });
    }
    
    draw(){
        stroke(100);
        strokeWeight(this.step)
        line(this.scanpoints[0][0],this.scanpoints[0][1],this.scanpoints[this.pointsNum-1][0],this.scanpoints[this.pointsNum-1][1])

        noStroke();
        this.scanpoints.forEach(p => {
            if(p[2]){
                circle(p[0],p[1],this.step);
            }
        });
    }

}