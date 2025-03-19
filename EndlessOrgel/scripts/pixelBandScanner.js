class pixelBandScanner{
    ROW = 10;
    COL = 10;

    notes = []
    constructor(canvassize){
        this.canvassize = canvassize;
        this.ROW = CELL;
        this.COL = this.ROW;

        this.step = (int)((this.canvassize) / this.ROW);

        this.count = 0;
        soundinit();

        this.notepix = [];
    }

    scanPixel(graph){
        this.notepix = [];

        graph.loadPixels();
        var r,g,b,v;
        var idx;
        var i = 0;
        var st = this.count*0.5;
        var et = (this.count+1)*0.5-0.4;

        for(var c = 0; c < this.COL; c++){
            var maxpixel = 0;
            var maxrow = 0;
            for(var r = 0; r < this.ROW;r++){
                var px = int(this.step*(c+0.5));
                var py = int(this.step*(r+0.5));

                idx = 4*(px + py*this.canvassize);
                var sum = graph.pixels[idx] + graph.pixels[idx+1] ;//+ graph.pixels[idx+2];

                if(sum > maxpixel){
                    maxpixel = sum;
                    maxrow = r;
                }
            }

            //max rowで音を鳴らす
            oscs[CELL-1-maxrow].play();
            this.notepix.push([c,maxrow]);
            this.notes.push(
                {pitch:oscs[i].note,startTime:st, endTime:et,program:40,velocity: 10}
            );
        }

        this.count++;
        
    }
    
    draw(){
        fill(255,100);
        strokeWeight(this.step)
        noStroke();
        translate(this.step*0.5,this.step*0.5);
        this.notepix.forEach(p=>{
            circle(p[0]*this.step,p[1]*this.step,this.step);
        });
    }

}