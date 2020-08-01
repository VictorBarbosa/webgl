import { CanvasInitializator } from './canvasInitializator.js';
;
const vertex_source = `
attribute vec4 position;
void main(){
    gl_Position = position;
    gl_PointSize = 10.0;
}
`;
const fragment_source = `
precision highp float;
uniform vec4 color;
void main(){
    gl_FragColor = color;

}
 `;
export class Ex5 extends CanvasInitializator {
    sample() {
        this.gl = this.canvas.getContext('webgl');
        this.gl.clearColor(0.0, 0.0, 1.0, 0.5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        let program = this.gl.createProgram();
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertex_source);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert("Erro to compile vertex");
        }
        let fragmentShade = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShade, fragment_source);
        this.gl.compileShader(fragmentShade);
        if (!this.gl.getShaderParameter(fragmentShade, this.gl.COMPILE_STATUS)) {
            alert("Erro to compile fragment");
        }
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShade);
        this.gl.linkProgram(program);
        this.gl.useProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            alert("Error to link");
        }
        let verticesLen = this.initVertexBuffer(this.gl, program);
        let color = this.gl.getUniformLocation(program, 'color');
        this.gl.uniform4fv(color, new Float32Array([0.0, 1.0, 0.0, 1.0]));
        this.gl.drawArrays(this.gl.POINTS, 0, verticesLen);
    }
    ;
    /**
     *
     * @param gl
     * @param program
     * @returns <number> len of vertices
     */
    initVertexBuffer(gl, program) {
        let vertices = new Float32Array([
            -0.5, 0.5,
            0.5, 0.5,
            -0.5, -0.5,
            0.5, -0.5,
            0.0, 0.0
        ]);
        let countVertices = vertices.length / 2;
        let vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        let position = gl.getAttribLocation(program, 'position');
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(position);
        return countVertices;
    }
}
