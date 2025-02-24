class wave{
    constructor(csize,y,amp){
        this.y = y;//random(csize);
        this.amp = random(amp*0.1,amp*1.5);
        this.rad = random(-180,180);
        this.csize = csize;
        this.color = [random(255),random(255),random(255)];
        this.speed = random(-1.5,1.5);
        this.start = random(-20);
        this.dash = random(5,50);
    }


    draw(){
        var sp = frameCount*this.dash;//this.speed*frameCount*0.5*sin(frameCount*0.05);

        stroke(this.color);
        for(var x =this.start; x < this.csize;x+=10){
            var dy = this.amp*(0.5+0.5*sin(this.rad+x+sp));
            
            line(x,this.csize,x, this.y - dy);
        }
        stroke(0);
        for(var x =this.start+5; x < this.csize;x+=10){
            var dy = this.amp*(0.5+0.5*sin(this.rad+x+sp));
            
            line(x,this.csize,x, this.y - dy);
        }
        noStroke();
        fill(255);
        for(var x =0; x < this.csize;x++){
            var dy = this.amp*(0.5+0.5*sin(this.rad+x+sp));
            
            circle(x,this.y -dy,5)
        }


    }
}