attribute vec4 position;
uniform vec4 translation;
void main(){
    gl_Position=position+translation;
    gl_PointSize=10.;
    
}