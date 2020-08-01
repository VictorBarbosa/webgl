import { CanvasInitializator } from './canvasInitializator.js';
const vertex_source = `
    attribute vec4 position;
    uniform  vec4 translation;
    void main(){
        gl_Position = position + translation;
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
export class ExDelete extends CanvasInitializator {
    sample() {
        let program = this.gl.createProgram();
        this.gl.clearColor(0, 0, 0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertex_source);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert('Error {vertext}');
        }
        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragment_source);
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert("Error {Fragment}");
        }
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        this.gl.useProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            alert("Error {Link}");
        }
        let triangleLen = this.drawTriangle(program);
        let color = this.gl.getUniformLocation(program, 'color');
        this.gl.uniform4fv(color, new Float32Array([1, 0, 0, 1]));
        let translation = this.gl.getUniformLocation(program, 'translation');
        this.gl.uniform4fv(translation, new Float32Array([0, 1, 0, 0]));
        this.gl.drawArrays(this.gl.TRIANGLES, 0, triangleLen);
    }
    drawTriangle(program) {
        //1
        // let vertices = new Float32Array([
        //     -0.5, 0.5,
        //     -0.5, -0.5,
        //     0.5, 0.5,
        //     0.5, -0.5,
        // ]);
        let vertices = new Float32Array([
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]);
        let verticeLen = vertices.length / 2;
        //2
        let buffer = this.gl.createBuffer();
        //3
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        //4
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        //5
        let position = this.gl.getAttribLocation(program, 'position');
        //6
        this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, 0, 0);
        //7
        this.gl.enableVertexAttribArray(position);
        //8
        return verticeLen;
    }
}
