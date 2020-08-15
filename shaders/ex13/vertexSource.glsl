attribute vec4 position;
attribute float sizePosition;
attribute vec4 v_color;
varying vec4 f_Color;
void main(){
    gl_Position=position;
    gl_PointSize=sizePosition;
    f_Color=v_color;
}