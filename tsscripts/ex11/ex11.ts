import { CanvasInitializator } from '../canvasInitializator.js';

 
export class Ex11 extends CanvasInitializator {
    rangeZ;
    rangeW;
    program;
    verticesLen: number = 0;
    w = 0.5;
    angle = 0.0;

    /**
     *
     */
    constructor(exName: string = null) {
        super()
        if (exName !== null) {
            this.getFileShader(exName).then(x => {
                this.sample();
            });
        } else {
            this.sample();
        }
    }
    sample() {
        this.program = this.gl.createProgram();

        
       

        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, this.  vertexSource);
        this.gl.compileShader(vertexShader);

        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert("Error to compile vertex");
        }

        let fragmentShander = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShander, this.  fragmentSource);
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
        this.gl.uniform4fv(color, new Float32Array([0.0, 1.0, 1.0, 0.5]));


        const div = this.insertOnBody();
        this.translationZEvent(div);
        this.translationWEvent(div);
        this.createTriangle();

    }
    createTriangle() {
        this.angle;
        this.gl.clearColor(0.0, 0.0, 0.0, 0.5)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        const radial = Math.PI * 90 / 180.0;
        const cosB = Math.cos(radial);
        const sinB = Math.sin(radial);



        let xformMatrix = new Float32Array([
            cosB, sinB, 0.0, 0.0,
            -sinB, cosB, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, this.w,

        ]);




        let u_xformMatrix = this.gl.getUniformLocation(this.program, 'u_xformMatrix');
        this.gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);



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
        let location = gl.getAttribLocation(program, 'a_Position');
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
        this.rangeZ.value = "0.0";

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
            this.angle = ev.target.value;
            this.createTriangle();
        }

    }

    translationWEvent(div) {
        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);

        const labelW = document.createElement('label') as HTMLLabelElement;
        this.rangeW = document.createElement('input') as HTMLInputElement;

        this.rangeW.type = 'range'
        this.rangeW.min = "-1.0"
        this.rangeW.max = "1.0"
        this.rangeW.step = "0.2"
        this.rangeW.value = "0.0";
        labelW.innerHTML = "Translation W"
        divContent.appendChild(labelW);
        divContent.appendChild(this.rangeW);

        this.rangeW.onchange = (ev: any) => {


            this.w = ev.target.value;



            this.createTriangle();


        }
    }

}  