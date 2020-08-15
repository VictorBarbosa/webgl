import { CanvasInitializator } from '../canvasInitializator.js';;



export class Ex5 extends CanvasInitializator{

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


        this.gl.clearColor(0.0, 0.0, 1.0, 0.5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        let program = this.gl.createProgram()
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


    };
    /**
     * 
     * @param gl 
     * @param program
     * @returns <number> len of vertices 
     */
    initVertexBuffer(gl: WebGLRenderingContext, program): number {
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