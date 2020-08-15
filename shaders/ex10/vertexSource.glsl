attribute vec4 position;
attribute vec4 transition;
uniform float cosB,sinB;
void main(){
    
    gl_Position.x=(position.x+transition.x)*cosB-(position.y+transition.y)*sinB;
    gl_Position.y=(position.x+transition.x)*sinB-(position.y+transition.y)*cosB;
    
    gl_Position.z=position.z;
    gl_Position.w=transition.w;
}