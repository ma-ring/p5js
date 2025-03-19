#version 300 es
precision mediump float;

uniform sampler2D tex;
uniform vec2 texelSize;
uniform vec2 blockSize;

out vec4 outColor;


void main(){
    vec2 uv = gl_FragCoord.xy * texelSize;

    vec2 bsize = texelSize*blockSize;
    vec2 blockStart = floor(uv / bsize) * bsize;

    int count = 0;
    vec3 sum = vec3(0.0);

    for(int i =0; i < int(blockSize.x);i++){
        for(int j = 0; j < int(blockSize.y); j++){
            vec2 offset = vec2(float(i), float(j))*texelSize;
            sum += texture(tex,blockStart+offset ).rgb;

            count++;
        }
    }

    outColor = vec4(sum/float(count),0.5);
    //outColor = sum/float(count);
}