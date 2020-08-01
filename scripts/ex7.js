import { CanvasInitializator } from './canvasInitializator.js';
const vertex_source = `
attribute vec4 location;
void main(){
    gl_Position = location;
}
`;
const fragmentSource = `
precision highp float;
uniform vec4 color;

void main(){
gl_FragColor =  color;
}
`;
export class Ex7 extends CanvasInitializator {
    sample() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        let program = this.gl.createProgram();
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertex_source);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert("Error Vertex");
        }
        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentSource);
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert("Error Fragment");
        }
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        this.gl.useProgram(program);
        let vertLen = this.initVertex(this.gl, program);
        // let color = this.gl.getUniform
        this.gl.drawArrays(this.gl.POINTS, 0, vertLen);
    }
    initVertex(gl, program) {
        let verticies = new Float32Array([]);
        let verticeLen = verticies.length / 2;
        let vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticeLen, gl.STATIC_DRAW);
        let position = gl.getAttribLocation(program, 'position');
        gl.vertexAttrib4fv(program, verticies);
        gl.enableVertexAttribArray(position);
        return verticeLen;
    }
}
