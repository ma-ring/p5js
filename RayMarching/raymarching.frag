#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform float time;
uniform float mouseX;
uniform float mouseY;


float dist_func(vec3 p){
    return length(p) -1.; 
}


float map(vec3 p){
    float displacement =0.25 *  cos(mouseX *0.1 * p.x ) *  cos(mouseY  * 0.1 * p.y);
                         //* cos(0.001 * p.z *  mouseX * mouseY) ;
    return dist_func(p) + displacement ;
}

vec4 ray_marching(vec3 pos, vec3 rd){
    
    vec4 color = vec4(0.,0.,0.,0.);

    const float MAX_STEP = 128.;
    const float MIN_D = 0.001;
    
    for(float i = 0.; i < MAX_STEP; i+=1.){
        float closest_d = map(pos);

        if(closest_d < MIN_D){
            float c =  0.4 - i / MAX_STEP;
            float ca =  0.1 - i / MAX_STEP;

            color = vec4(c,c,c,ca);// vec3(1.,1.,1.);
            break;
        }
        
        pos += rd *  closest_d;
    }

    return color;
}

void main(){
    vec2 texCoord = vTexCoord.st * 2. - 1.;
    vec3 rd = normalize(vec3(texCoord,1));
    
    vec3 pos;
    pos.x = 0.;//texCoord.x;
    pos.y = 0.;//texCoord.y;
    pos.z = -2.;

    vec4 color = ray_marching(pos,rd);
    gl_FragColor = color;// vec4(color,1.0);
    //gl_FragColor = vec4(1.,1.,1.,1.0);

}