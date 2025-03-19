#version 300 es
precision mediump float;

uniform sampler2D curFrame;
uniform sampler2D preFrame;
uniform float delta;

in vec2 vTexCoord;
out vec4 outColor;

void main() {
    vec2 offset = vec2(1.0 / float(textureSize(preFrame, 0).x),
                        1.0 / float(textureSize(preFrame, 0).y));

    float prevL = texture(preFrame, vTexCoord).r;
    float currL = texture(curFrame, vTexCoord).r;

    float Ix = (texture(curFrame, vTexCoord + vec2(offset.x, 0.0)).r -
                    texture(curFrame, vTexCoord - vec2(offset.x, 0.0)).r) * 0.5;
    float Iy = (texture(curFrame, vTexCoord + vec2(0.0, offset.y)).r -
                    texture(curFrame, vTexCoord - vec2(0.0, offset.y)).r) * 0.5;
    
    float It = currL - prevL;  
    vec2 flow = vec2(-Ix * It, -Iy * It) * delta;


    vec4 myColor = vec4(flow * 10.0, 0.0, 0.1);
    outColor = myColor;
}