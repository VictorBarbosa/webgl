attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_ViewMatrix;
varying vec4 v_Color;
void main(){
     gl_Position=u_ViewMatrix * a_Position;
    // gl_Position=a_Position;
    gl_PointSize=10.;
    v_Color=a_Color;
}
