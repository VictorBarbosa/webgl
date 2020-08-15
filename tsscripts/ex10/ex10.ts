import { CanvasInitializator } from '../canvasInitializator.js';
;
 
export class Ex10 extends CanvasInitializator {
    program;
    verticesLen: number = 0;
    rangeW: HTMLInputElement;
    rangeX: HTMLInputElement;
    rangeY: HTMLInputElement;
    rangeAngle: HTMLInputElement;

    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 0;
    angle = 90.0;

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
        this.gl.shaderSource(vertexShader, this.vertexSource);
        this.gl.compileShader(vertexShader);

        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert("Error : {Vertex}");
        }


        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, this.fragmentSource);
        this.gl.compileShader(fragmentShader);

        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert("Error : {Fragment}");
        }

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Error : {Program}")
        }

        this.createTriangle();
        const div = this.insertOnBody();
        this.goToUpDowm(div);
        this.goToLeftRight(div);
        this.goToCloseFar(div);
        this.tournAround(div);
        this.initilizeObjetc();

    }

    initilizeObjetc(localTriangle: Float32Array = new Float32Array()) {
        let color = this.gl.getUniformLocation(this.program, 'color');
        this.gl.uniform4fv(color, new Float32Array([1, 0, 0, 1]));



        let transition = this.gl.getAttribLocation(this.program, 'transition');
        this.gl.vertexAttrib4fv(transition, localTriangle);

        this.gl.clearColor(0, 0, 0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);


        const radial = Math.PI * this.angle / 90.0;
        const con = Math.cos(radial);
        const sin = Math.sin(radial);

        let conB = this.gl.getUniformLocation(this.program, 'cosB');
        let sinB = this.gl.getUniformLocation(this.program, 'sinB');

        this.gl.uniform1f(conB, con);
        this.gl.uniform1f(sinB, sin);


        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.verticesLen);
    }
    createTriangle(): number {
        //1
        let vertecies = new Float32Array([
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]);
        this.verticesLen = vertecies.length / 2;
        //2
        let vertexBuffer = this.gl.createBuffer();
        //3
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        //4
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertecies, this.gl.STATIC_DRAW);
        //5
        let position = this.gl.getAttribLocation(this.program, 'position');
        //6
        this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, 0, 0);
        //7
        this.gl.enableVertexAttribArray(position);
        //8

        return this.verticesLen;
    }
    goToLeftRight(div: HTMLDivElement) {

        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);
        // X
        const labelX = document.createElement('label') as HTMLLabelElement;
        const labelMin = document.createElement('label') as HTMLLabelElement;
        const labelMax = document.createElement('label') as HTMLLabelElement;
        const labelCurrent = document.createElement('label') as HTMLLabelElement;
        this.rangeX = document.createElement('input') as HTMLInputElement;
        this.rangeX.type = 'range'
        this.rangeX.min = "-1.0"
        this.rangeX.max = "1.0"
        this.rangeX.step = "0.1"
        this.rangeX.value = "0.0";



        labelX.innerHTML = `Left Right (X) ${this.rangeX.value}`;
        divContent.appendChild(labelX);
        divContent.appendChild(labelMin);
        divContent.appendChild(labelMax);
        divContent.appendChild(labelCurrent);
        divContent.appendChild(this.rangeX);

        this.rangeX.onchange = (ev: any) => {
            this.x = ev.target.value;
            labelX.innerHTML = `Left Right (X) ${this.x}`;

            const local = new Float32Array([this.x, 0, 0, this.w]);
            this.initilizeObjetc(local);
        }

    }
    goToUpDowm(div: HTMLDivElement) {

        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);
        // Y
        const labelY = document.createElement('label') as HTMLLabelElement;
        const labelMin = document.createElement('label') as HTMLLabelElement;
        const labelMax = document.createElement('label') as HTMLLabelElement;
        const labelCurrent = document.createElement('label') as HTMLLabelElement;
        this.rangeY = document.createElement('input') as HTMLInputElement;
        this.rangeY.type = 'range'
        this.rangeY.min = "-1.0"
        this.rangeY.max = "1.0"
        this.rangeY.step = "0.1"
        this.rangeY.value = "0.0";



        labelY.innerHTML = `Up Down (Y) ${this.rangeY.value}`;
        divContent.appendChild(labelY);
        divContent.appendChild(labelMin);
        divContent.appendChild(labelMax);
        divContent.appendChild(labelCurrent);
        divContent.appendChild(this.rangeY);

        this.rangeY.onchange = (ev: any) => {
            this.y = ev.target.value;
            labelY.innerHTML = `Up Down (Y) ${this.y}`;

            const local = new Float32Array([this.x, this.y, 0, this.w]);
            this.initilizeObjetc(local);
        }

    }
    goToCloseFar(div: HTMLDivElement) {
        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);
        // X
        const labelW = document.createElement('label') as HTMLLabelElement;
        const labelMin = document.createElement('label') as HTMLLabelElement;
        const labelMax = document.createElement('label') as HTMLLabelElement;
        const labelCurrent = document.createElement('label') as HTMLLabelElement;
        this.rangeW = document.createElement('input') as HTMLInputElement;
        this.rangeW.type = 'range'
        this.rangeW.min = "0.5"
        this.rangeW.max = "1.0"
        this.rangeW.step = "0.1"
        this.rangeW.value = "0.0";


        labelW.innerHTML = `Far and Close (W) ${this.rangeW.value}`;
        divContent.appendChild(labelW);
        divContent.appendChild(labelMin);
        divContent.appendChild(labelMax);
        divContent.appendChild(labelCurrent);
        divContent.appendChild(this.rangeW);

        this.rangeW.onchange = (ev: any) => {
            this.w = ev.target.value;
            labelW.innerHTML = `Far and Close (W) ${this.w}`;
            const local = new Float32Array([this.x, this.y, 0, this.w]);
            this.initilizeObjetc(local);
        }
    }
    tournAround(div: HTMLDivElement) {
        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);
        // X
        const labelAngle = document.createElement('label') as HTMLLabelElement;
        const labelMin = document.createElement('label') as HTMLLabelElement;
        const labelMax = document.createElement('label') as HTMLLabelElement;
        const labelCurrent = document.createElement('label') as HTMLLabelElement;
        this.rangeAngle = document.createElement('input') as HTMLInputElement;
        this.rangeAngle.type = 'range'
        this.rangeAngle.min = "90"
        this.rangeAngle.max = "180.0"
        this.rangeAngle.step = "10.0"
        this.rangeAngle.value = "0.0";



        labelAngle.innerHTML = `Angle ${this.rangeAngle.value}°`;
        divContent.appendChild(labelAngle);
        divContent.appendChild(labelMin);
        divContent.appendChild(labelMax);
        divContent.appendChild(labelCurrent);
        divContent.appendChild(this.rangeAngle);

        this.rangeAngle.onchange = (ev: any) => {
            this.angle = ev.target.value;
            labelAngle.innerHTML = `Angle ${this.angle}°`;
            const local = new Float32Array([this.x, this.y, 0, this.w]);
            this.initilizeObjetc(local);
        }



    }
}