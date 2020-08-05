import { CanvasInitializator } from './canvasInitializator.js';

const vertexSource = `
attribute vec4 position;
  uniform mat4 u_xformMatrix;
void main(){
    gl_Position =   u_xformMatrix  * position;
    // gl_PointSize = 10.0;
}
`;
const fragmentSource = `
precision highp float;
uniform vec4 color;
void main(){
    gl_FragColor = color;
}
`;
export class Ex12 extends CanvasInitializator {
    sample() {

        this.program = this.gl.createProgram();

        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexSource)
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert('Error : {Vertext}');
        }

        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentSource)
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert('Error : {Fragment}');
        }

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert('Error : {Link}');
        }


        let color = this.gl.getUniformLocation(this.program, 'color');
        this.gl.uniform4fv(color, new Float32Array([0.0, 1.0, 1.0, 0.5]));

        const verticiesLen = this.createTriangle();

        let ang = 0;
        let isUp = true;

        let g_last = new Date().getDate();

        let tick = () => {
            let now = new Date().getTime();

            let elapsed = now - g_last;
            g_last = now;
            this.gl.clearColor(0, 0, 0, .5);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            var xformMatrix = new this.Matrix4();

            let newAngle = ang + (45.0 * elapsed) / 1000.0;
            newAngle =     newAngle %= 360;

          
            xformMatrix.setRotate(newAngle, 0, 0, 1);
            xformMatrix.translate(0.36, 0, 0.0);

            let u_xformMatrix = this.gl.getUniformLocation(this.program, 'u_xformMatrix');
            this.gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements);



            this.gl.drawArrays(this.gl.TRIANGLES, 0, verticiesLen);

            ang += 1;
            requestAnimationFrame(tick)

        }
        tick();
    }

    createTriangle(): number {
        //1
        const verticies = new Float32Array([
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]);
        const verticiesLen = verticies.length / 2;

        //2
        const buffer = this.gl.createBuffer();
        //3
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        //4
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);
        //5
        const position = this.gl.getAttribLocation(this.program, 'position');
        //6
        this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, 0, 0);
        //7
        this.gl.enableVertexAttribArray(position);
        //8

        return verticiesLen;
    }
}