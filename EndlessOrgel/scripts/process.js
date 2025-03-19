class imgProcess{
    constructor(size){

        this.grapsh = createGraphics(size,size,WEBGL);

        this.curFrame = createGraphics(size,size);
        this.preFrame = createGraphics(size,size);

        this.curFrame.translate(size*0.5,size*0.5);
        this.preFrame.translate(size*0.5,size*0.5);

    }

    setupDOF(blockSize){
        this.mode = 0;
        // desnce optical flow
        this.shader = loadShader("shaders/opticalFlow.vert","shaders/opticalFlow.frag");
        this.avrshader = loadShader("shaders/resample.vert","shaders/resample.frag");

        this.resample = createGraphics(size,size,WEBGL);
        this.bsize = blockSize;
        this.curFrame.scale(1,1,1);
        this.preFrame.scale(1,1,1);

    }
    setupBGDIFF(){
        this.mode = 1;
        this.shader = loadShader("shaders/diff.vert","shaders/diff.frag");
        this.curFrame.rotate(PI);
        this.preFrame.rotate(PI);
        this.curFrame.scale(-1,1,1);
        this.preFrame.scale(-1,1,1);

    }
    
    process(cnv,src){
        switch(this.mode){
            case 0:
                return this.denseOF(cnv,src);
            case 1:
                return this.bgdiff(cnv,src);
        }
        
    }

    bgdiff(cnv,src){
        //update
        this.curFrame.image(src,-w*0.5,-h*0.5,w,h);
        this.grapsh.clear();
        this.grapsh.shader(this.shader);
        // set params for shader
        this.shader.setUniform("curFrame",this.curFrame);
        this.shader.setUniform("preFrame",this.preFrame);
        //draw on graph
        this.grapsh.plane(this.grapsh.width, this.grapsh.height);

        //keep
        this.preFrame.image(src,-w*0.5,-h*0.5,w,h);

        return this.grapsh;
    }

    denseOF(cnv,src){
        //update
        this.curFrame.image(src,-w*0.5,-h*0.5,w,h);
        this.grapsh.clear();
        this.grapsh.shader(this.shader);
        // set params for shader
        this.shader.setUniform("curFrame",this.curFrame);
        this.shader.setUniform("preFrame",this.preFrame);
        this.shader.setUniform("delta",deltaTime);
        //draw on graph
        this.grapsh.plane(this.grapsh.width, this.grapsh.height);

        //keep
        this.preFrame.image(src,-w*0.5,-h*0.5,w,h);

        //resample
        this.resample.clear();
        this.resample.shader(this.avrshader);
        this.avrshader.setUniform("tex",this.grapsh);
        this.avrshader.setUniform("texelSize",[1/size,1/size]);
        this.avrshader.setUniform("blockSize",[this.bsize ,this.bsize ]);
        this.resample.plane(this.resample.width, this.resample.height);


        return this.resample;        
    }
}