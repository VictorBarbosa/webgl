attribute vec4 position;
uniform vec4 translation;
uniform float cosB,sinB;
void main(){
    gl_Position.x=position.x*cosB-position.y*sinB;
    gl_Position.y=position.x*sinB-position.y*cosB;
    gl_Position.z=position.z;
    gl_Position.w=1.;
    
}