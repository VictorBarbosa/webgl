import { CanvasInitializator } from './canvasInitializator.js';
const vertex_source = `
attribute vec4 location;
void main(){
    gl_Position = location;
    gl_PointSize = 10.0;
}
`;
const framgnet_source = `
precision highp float;
uniform vec4 color;
void main(){
    gl_FragColor = color;
}
`;
export class Ex6 extends CanvasInitializator {
    sample() {
        let program = this.gl.createProgram();
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertex_source);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert("Error to compile vertex");
        }
        let fragmentShander = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShander, framgnet_source);
        this.gl.compileShader(fragmentShander);
        if (!this.gl.getShaderParameter(fragmentShander, this.gl.COMPILE_STATUS)) {
            alert("Error to compile fragment");
        }
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShander);
        this.gl.linkProgram(program);
        this.gl.useProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            alert("Error to link programs");
        }
        let verticesLen = this.initVertexPoints(this.gl, program);
        let color = this.gl.getUniformLocation(program, 'color');
        this.gl.uniform4fv(color, new Float32Array([0.0, 1.0, 0.0, 1.0]));
        this.gl.drawArrays(this.gl.TRIANGLES, 0, verticesLen);
    }
    initVertexPoints(gl, program) {
        // 1
        let vertecies = new Float32Array([
            0.0, 0.8,
            -0.5, -0.4,
            0.5, -0.4,
            0.0, -0.8,
            0.5, 0.4,
            -0.5, 0.4
        ]);
        let countVertices = vertecies.length / 2;
        // 2
        let vertexBuffer = gl.createBuffer();
        //3
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        //4
        gl.bufferData(gl.ARRAY_BUFFER, vertecies, gl.STATIC_DRAW);
        // 5
        let location = gl.getAttribLocation(program, 'location');
        // 6
        gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
        // 7
        gl.enableVertexAttribArray(location);
        // 8
        return countVertices;
    }
}
