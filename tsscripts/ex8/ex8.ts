import { CanvasInitializator } from '../canvasInitializator.js';

 
export class Ex8 extends CanvasInitializator {
    program;
    rangeX: HTMLInputElement;
    rangeY: HTMLInputElement;
    rangeW: HTMLInputElement;
    triangleLen: number = 0;

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
    drawElement(transitionFloat: Float32Array = new Float32Array()) {
        this.gl.clearColor(0, 0, 0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        let color = this.gl.getUniformLocation(this.program, 'color');
        this.gl.uniform4fv(color, new Float32Array([1, 0, 0, 1]));

        let translation = this.gl.getUniformLocation(this.program, 'translation');
        this.gl.uniform4fv(translation, transitionFloat)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.triangleLen);
    }
    sample() {
 
        const div = this.insertOnBody();
        this.translationXEvent(div);
        this.translationYEvent(div);
        this.translationWEvent(div);




        this.program = this.gl.createProgram();


        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, this.vertexSource);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert('Error {vertext}');
        }

        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, this.fragmentSource);
        this.gl.compileShader(fragmentShader);

        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert("Error {Fragment}")
        }

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Error {Link}");
        }


        this.triangleLen = this.drawTriangle(this.program);

        this.drawElement();

    }

    drawTriangle(program): number {
        //1
  


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
        this.gl.enableVertexAttribArray(position)
        //8

        return verticeLen;
    }
    translationXEvent(div) {
        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);
        // X
        const labelX = document.createElement('label') as HTMLLabelElement;
        this.rangeX = document.createElement('input') as HTMLInputElement;
        this.rangeX.type = 'range'
        this.rangeX.min = "-1.0"
        this.rangeX.max = "1.0"
        this.rangeX.step = "0.2"
        this.rangeX.value = "0.0";

        labelX.innerHTML = "Translation X"
        divContent.appendChild(labelX);
        divContent.appendChild(this.rangeX);
        this.rangeX.onchange = (ev: any) => {

            const x = ev.target.value;
            const y = this.rangeY.value;
            const z = 0;
            const w = this.rangeW.value;

            const triangle = new Float32Array([x, y, z, w]);
            this.drawElement(triangle);


        }

    }
    translationYEvent(div) {
        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);
        const labelY = document.createElement('label') as HTMLLabelElement;
        this.rangeY = document.createElement('input') as HTMLInputElement;

        this.rangeY.type = 'range'
        this.rangeY.min = "-1.0"
        this.rangeY.max = "1.0"
        this.rangeY.step = "0.2"
        this.rangeY.value = "0.0";
        labelY.innerHTML = "Translation Y"
        divContent.appendChild(labelY);
        divContent.appendChild(this.rangeY);

        this.rangeY.onchange = (ev: any) => {

            const x = this.rangeX.value;
            const y = ev.target.value;;
            const z = 0;
            const w = this.rangeW.value;

            const triangle = new Float32Array([x, y, z, w]);
            this.drawElement(triangle);


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

            const x  = this.rangeX.value;
            const y  = this.rangeY.value;
            const z = 0;
            const w = ev.target.value;

            const triangle = new Float32Array([x, y, z, w]);
            this.drawElement(triangle);


        }
    }
}