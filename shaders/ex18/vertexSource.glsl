attribute vec4 a_Position;
 
uniform mat4 u_ViewProjMatrix;

attribute vec4 a_Color;
varying vec4 v_Color;

void main(){
    // gl_Position=u_ProjMatrix*u_ViewMatrix *a_Position;
    
    gl_Position=u_ViewProjMatrix*a_Position;
    gl_PointSize=10.;
    v_Color=a_Color;
}
