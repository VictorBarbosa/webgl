attribute vec4 position;
uniform mat4 u_xformMatrix;
void main(){
    gl_Position=u_xformMatrix*position;
  
}