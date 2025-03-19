#version 300 es
in vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition*2.0,0.0,1.0);
}