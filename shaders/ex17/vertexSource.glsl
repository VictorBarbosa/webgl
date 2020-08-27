attribute vec4 a_Position;
uniform mat4 u_ModelViewMatrix;

attribute vec4 a_Color;
varying vec4 v_Color;

void main(){
    //    gl_Position = a_Position;
    
    gl_Position=u_ModelViewMatrix*a_Position;
    
    gl_PointSize=10.;
    v_Color=a_Color;
}
