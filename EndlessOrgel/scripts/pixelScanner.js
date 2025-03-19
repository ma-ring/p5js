class pixelScanner{
    notes = []
    constructor(canvassize){
        this.canvassize = canvassize;
        this.scanpoints = [];

        this.step = (ceil)((this.canvassize*0.5) / CELL);
        for(var y = this.canvassize*0.5; y < this.canvassize; y+=this.step ){
            this.scanpoints.push([this.canvassize*0.5,y,false,0,0,0]);
        }
        this.pointsNum = this.scanpoints.length;
        this.count = 0;

        soundinit();
    }

    setScanLine(){
        
    }

    scanPixel(){
        loadPixels();
        var r,g,b,v;
        var idx;
        var i = 0;
        var st = this.count*0.5;
        var et = (this.count+1)*0.5-0.4;

        this.scanpoints.forEach(p => {
            r = 0; g = 0; b = 0;
            for(var d = 0; d < this.step;d++){
                idx = 4*(p[0] + (p[1]+d)*this.canvassize);
                r += pixels[idx];
                g += pixels[idx+1];
                b += pixels[idx+2];
            }
            r /=this.step; g /=this.step; b/=this.step;
            v = 0.2126*r + 0.7152*g + 0.0722*b;
            p[3] = r;
            p[4] = g;
            p[5] = b;

            if(v > 150){
                oscs[i].play()
                p[2] = true;
                p[3] = r;
                p[4] = g;
                p[5] = b;

                this.notes.push(
                    {pitch:oscs[i].note,startTime:st, endTime:et,program:40}
                );
            }
            else{p[2] = false;}
            i++;

        });

        this.count++;
    }
    
    draw(){
        stroke(100,100);
        strokeWeight(this.step)
        line(this.scanpoints[0][0],this.scanpoints[0][1],this.scanpoints[this.pointsNum-1][0],this.scanpoints[this.pointsNum-1][1])

        noStroke();
        this.scanpoints.forEach(p => {
            if(p[2]){
                fill(p[3],p[4],p[5])
                circle(p[0],p[1]+this.step*0.5,this.step);
            }
        });
    }

}