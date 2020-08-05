import { CanvasInitializator } from './canvasInitializator.js';

const vertex_source = `
    attribute vec4 position;
    uniform  vec4 translation;
    uniform float cosB,sinB;
    void main(){
          gl_Position.x = position.x * cosB - position.y * sinB;
        gl_Position.y = position.x * sinB - position.y * cosB;
        gl_Position.z = position.z;
        gl_Position.w = 1.0;

    }
    `;
const fragment_source = `
    precision highp float;
    uniform vec4 color;
    void main(){
        gl_FragColor = color;
    }
`;
export class Ex9 extends CanvasInitializator {
    rangeZ;
    program;
    verticesLen: number = 0;
    sample() {
        this.program = this.gl.createProgram();



        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertex_source);
        this.gl.compileShader(vertexShader);

        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert("Error to compile vertex");
        }

        let fragmentShander = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShander, fragment_source);
        this.gl.compileShader(fragmentShander);

        if (!this.gl.getShaderParameter(fragmentShander, this.gl.COMPILE_STATUS)) {
            alert("Error to compile fragment");
        }

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShander);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Error to link programs");
        }

        this.verticesLen = this.initVertexPoints(this.gl, this.program);

        let color = this.gl.getUniformLocation(this.program, 'color');
        this.gl.uniform4fv(color, new Float32Array([0.0, 1.0, 0.0, 1.0]));


        const div = this.insertOnBody();
        this.translationZEvent(div);
   
        this.createTriangle(180.0);

    }
    createTriangle(angle = 90.0) {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        const radial = Math.PI * angle / 180.0;
        const cos = Math.cos(radial);
        const sin = Math.sin(radial);
        let cosB = this.gl.getUniformLocation(this.program, 'cosB');
        let sinB = this.gl.getUniformLocation(this.program, 'sinB');

        this.gl.uniform1f(cosB, cos);
        this.gl.uniform1f(sinB, sin);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.verticesLen);
    }
    initVertexPoints(gl: WebGLRenderingContext, program): number {
        // 1
        let vertecies = new Float32Array([
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]);

        let countVertices = vertecies.length / 2;
        // 2
        let vertexBuffer = gl.createBuffer();
        //3
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        //4
        gl.bufferData(gl.ARRAY_BUFFER, vertecies, gl.STATIC_DRAW);
        // 5
        let location = gl.getAttribLocation(program, 'position');
        // 6
        gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
        // 7
        gl.enableVertexAttribArray(location);
        // 8
        return countVertices;
    }

    translationZEvent(div) {

        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);
        // X
        const labelZ = document.createElement('label') as HTMLLabelElement;
        const labelMin = document.createElement('label') as HTMLLabelElement;
        const labelMax = document.createElement('label') as HTMLLabelElement;
        const labelCurrent = document.createElement('label') as HTMLLabelElement;
        this.rangeZ = document.createElement('input') as HTMLInputElement;
        this.rangeZ.type = 'range'
        this.rangeZ.min = "0.0"
        this.rangeZ.max = "360.0"
        this.rangeZ.step = "1"
        this.rangeZ.value = "180.0";

        labelZ.innerHTML = "Rotation Z ";
        labelMin.innerHTML = "Min : 0.0 ";
        labelMax.innerHTML = "Max : 360.0 ";
        labelCurrent.innerHTML = "Current - " + this.rangeZ.value;
        divContent.appendChild(labelZ);
        divContent.appendChild(labelMin);
        divContent.appendChild(labelMax);
        divContent.appendChild(labelCurrent);
        divContent.appendChild(this.rangeZ);

        this.rangeZ.onchange = (ev: any) => {
            labelCurrent.innerHTML = "Current : " + ev.target.value;
            this.createTriangle(ev.target.value);
        }

    }
}  