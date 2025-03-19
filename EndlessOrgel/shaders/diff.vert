
attribute vec2 aTexCoord;
attribute vec3 aPosition;
varying vec2 vTexCoord;

void main(){
    vTexCoord = aTexCoord;
    gl_Position = vec4(aPosition*2.0,1.0);

}