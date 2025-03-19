#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D curFrame;
uniform sampler2D preFrame;
varying vec2 vTexCoord;

void main(){
    vec4 cColor = texture2D(curFrame,vTexCoord);
    vec4 pColor = texture2D(preFrame,vTexCoord);

    float diff = length(cColor.rgb - pColor.rgb);

    gl_FragColor = vec4(diff,diff,diff,0.2);
}