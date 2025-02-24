class wave{
    constructor(csize){
        this.y = random(csize);
        this.amp = random(csize*0.1,csize);
        this.rad = random(-180,180);
        this.csize = csize;
        this.color = [random(255),random(255),random(255),100];
        this.speed = random(-1.5,1.5);
        this.start = 0; random(10);
        this.dash = random(5,20);
    }

    draw1(){
        var sp = this.speed*frameCount*0.5*sin(frameCount*0.05);

        stroke(this.color,100);
        for(var x =this.start*sin(frameCount); x < this.csize;x+=5*(1+0.5*cos(frameCount))){
            var px = 10*sin(this.rad +sp+x)*tan(sp);
            var py = sin(sp)*300*cos(sp+x+ this.rad )*sin(sp);
            var dy = this.y+this.amp*sin(this.rad+x+sp);
            //line(x,dy+this.csize*cos(frameCount)+this.csize,x,dy);
            line(px + x,py,
                 px + x*tan(sp)*sin(sp+x),py + dy*cos(sp+x));

        }
    }
    draw2(){
        var sp = this.speed*frameCount*0.5*sin(frameCount*0.05);

        stroke(this.color,100);
        for(var x =this.start*sin(frameCount); x < this.csize;x+=5*(1+0.5*cos(frameCount))){
            var px = 10*sin(this.rad +sp+x)*tan(sp);
            var py = sin(sp)*300*cos(sp+x+ this.rad )*sin(sp);
            var dy = this.y+this.amp*sin(this.rad+x+sp);
            line(x,dy+this.csize*cos(frameCount)+this.csize,x,dy);
        }
    }
    draw(){
        var sp = this.speed*frameCount*0.5*sin(frameCount*0.05);
        drawingContext.setLineDash([this.dash, 15]);

        stroke(this.color,100);
        for(var x =this.start*sin(frameCount); x < this.csize;x+=5*(1+0.5*cos(frameCount))){
            var px = 10*sin(this.rad +sp+x)*tan(sp);
            var py = sin(sp)*300*cos(sp+x+ this.rad )*sin(sp);
            var dy = this.y+this.amp*sin(this.rad+x+sp);
            line(x,dy,x,dy+this.csize*cos(frameCount)+this.csize);

        }
    }
}