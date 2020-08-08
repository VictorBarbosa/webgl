import { CanvasInitializator } from './canvasInitializator.js';
const vertexSource = `
    attribute vec4 position;
    attribute vec4 color;
    uniform vec4 translation;
    varying vec4 fragColor;
    uniform mat4 u_xformMatrix;
    void main(){
        gl_Position = u_xformMatrix * (position + translation);
        fragColor = color;
        gl_PointSize = 10.0;
    }
`;
const fragmentSource = `
    precision highp float;
    varying vec4 fragColor;

    void main(){
        gl_FragColor = fragColor;
    }
`;

export class Ex14 extends CanvasInitializator {
    angle = 0.0;
    x = 0.0;
    y = 0.0;
    z = 0.0;
    sample() {
        this.program = this.gl.createProgram();



        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexSource);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert('Error {Vertex}');
        }
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentSource);
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert('Error {fragment}');
        }
        // const div = this.insertOnBody();

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Error {Link}")
        }
        const div = this.insertOnBody();

        this.rangerX(div, (ev: Event) => this.axisX(ev));
        this.rangerY(div, (ev: Event) => this.axisY(ev));
        this.rangerZ(div, (ev: Event) => this.axisZ(ev));
        this.rangerW(div, (ev: Event) => this.axisW(ev));
        this.rotation(div, (ev: Event) => this.rotationImage(ev));

        this.draw();


    };


    draw() {
        const matrix = new this.Matrix4();
        matrix.setRotate(this.angle, this.x, this.y, 1);
        this.gl.clearColor(0, 0.0, 0, .5);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        const vertices = new Float32Array([
            0.0, 0.5, 0.0, 0.0, 0.5, 
            -0.5, -0.5, 0.0, 1.0, 0.0,
            0.5, -0.5, 1.0, 1.0, 0.0,
        ]);

        const stride = vertices.BYTES_PER_ELEMENT * 5;
        const verticesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, verticesBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        const initialBytePosition = 0;
        const position = this.gl.getAttribLocation(this.program, 'position');
        this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, stride, initialBytePosition);
        this.gl.enableVertexAttribArray(position);


        const initialByteColor = 8;
        const color = this.gl.getAttribLocation(this.program, 'color');
        this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false, stride, initialByteColor)
        this.gl.enableVertexAttribArray(color);

        const u_xformMatrix = this.gl.getUniformLocation(this.program, 'u_xformMatrix');

        this.gl.uniformMatrix4fv(u_xformMatrix, false, matrix.elements)


        const translation = new Float32Array([this.x, this.y, 0, 0.0]);
        const translationLocation = this.gl.getUniformLocation(this.program, 'translation');
        this.gl.uniform4fv(translationLocation,translation)

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    }
    axisX(ev: any): void {
        this.x = ev.target.value;
        this.draw();
    }
    axisY(ev: any): void {
        this.y = ev.target.value;
        this.draw();
    }
    axisZ(ev: Event): void {
        this.draw();
    }
    axisW(ev: Event): void {
        this.draw();
    }
    rotationImage(ev: any): void {
        this.angle = ev.target.value;
        this.draw();
    }

}