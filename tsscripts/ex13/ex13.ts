import { CanvasInitializator } from '../canvasInitializator.js';



export class Ex13 extends CanvasInitializator {

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
        this.gl = this.canvas.getContext('webgl');


        this.gl.clearColor(0.0, 0.0, 0.0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

         this. program = this.gl.createProgram()
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, this.vertexSource);
        this.gl.compileShader(vertexShader);

        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert("Erro to compile vertex")
        }
        let fragmentShade = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShade, this.fragmentSource);
        this.gl.compileShader(fragmentShade);

        if (!this.gl.getShaderParameter(fragmentShade, this.gl.COMPILE_STATUS)) {
            alert("Erro to compile fragment")
        }

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShade);
        this.gl.linkProgram(this.program);
        this.gl.useProgram( this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Error to link");
        }


        let verticesLen = this.initVertexBuffer(this.gl, this.program);

        // let color = this.gl.getUniformLocation(program, 'color');
        // this.gl.uniform4fv(color, new Float32Array([0.0, 1.0, 0.0, 1.0]));

        this.gl.drawArrays(this.gl.TRIANGLES, 0, verticesLen);


    };
    /**
     * 
     * @param gl 
     * @param program
     * @returns <number> len of vertices 
     */
    initVertexBuffer(gl: WebGLRenderingContext, program): number {


        let verticesSizes = new Float32Array([
            0.0, 0.5, 10.0, 1.0, 1.0, 0.0,
            -0.5, -0.5, 20.0, 0.0, 1.0, 1.0,
            0.5, -0.5, 30.0, 1.0, 0.0, 1.0,
        ])

        let countVertex = verticesSizes.length / 3;
        let vertexSizeBuffer = gl.createBuffer();
        // Write vertex coords and point sizes to the buffer and enable it 
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

        let FSIZE = verticesSizes.BYTES_PER_ELEMENT;
        const stride = 24;

        const offSetIndexPosition = 0;
        const offSetIndexSizePosition = 8;
        const offSetIndexVColor = 12;


        // Get the storage location of a_Position, allocate buffer, & enable 
        let a_Position = gl.getAttribLocation(program, 'position');
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, stride, offSetIndexPosition);
        gl.enableVertexAttribArray(a_Position);

        // // Get the storage location of a_PointSize, allocate buffer, & enable 
        let a_PointSize = gl.getAttribLocation(program, 'sizePosition');
        gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, stride, offSetIndexSizePosition);
        gl.enableVertexAttribArray(a_PointSize);

        // Get the storage location of a_PointSize, allocate buffer, & enable 
        let v_color = gl.getAttribLocation(program, 'v_color');
        gl.vertexAttribPointer(v_color, 3, gl.FLOAT, false, stride, offSetIndexVColor);
        gl.enableVertexAttribArray(v_color);
        return countVertex;

    }
}