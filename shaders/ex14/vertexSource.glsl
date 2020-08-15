attribute vec4 position;
attribute vec4 color;
uniform vec4 translation;
varying vec4 fragColor;
uniform mat4 u_xformMatrix;
void main(){
    gl_Position=u_xformMatrix*(position+translation);
    fragColor=color;
    gl_PointSize=10.;
}