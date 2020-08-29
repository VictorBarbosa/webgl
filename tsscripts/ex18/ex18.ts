
import { CanvasInitializator } from '../canvasInitializator.js';

export class Ex18 extends CanvasInitializator {

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


        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, this.vertexSource);
        this.compileShader(vertexShader, 'Vertex');

        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, this.fragmentSource);
        this.compileShader(fragmentShader, 'Fragment');

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);


        const verticies = new Float32Array([
            // // Triangle esquedo  verde 
            // -0.75, 0.75, -0.4, 0.0, 1.0, 0.0,
            // -0.90, 0.15, -0.4, 0.0, 1.0, 0.0,
            // -0.60, 0.15, -0.4, 0.0, 1.0, 0.0,


            // //Triango esquedo azul
            // -0.75, 0.50, -0.2, 0.0, 0.0, 1.0,
            // -0.90, -0.10, -0.2, 0.0, 0.0, 1.0,
            // -0.60, -0.10, -0.2, 0.0, 0.0, 1.0,

            // //Triango esquedo Vermelho

            // -0.75, 0.25, 0.0, 1.0, 0.0, 0.0,
            // -0.90, -0.35, 0.0, 1.0, 0.0, 0.0,
            // -0.60, -0.35, 0.0, 1.0, 0.0, 0.0,





            // // Triangle direito  verde 
            // 0.75, 0.75, -0.4, 0.0, 1.0, 0.0,
            // 0.90, 0.15, -0.4, 0.0, 1.0, 0.0,
            // 0.60, 0.15, -0.4, 0.0, 1.0, 0.0,


            // //Triango esquedo azul
            // 0.75, 0.50, -0.2, 0.0, 0.0, 1.0,
            // 0.90, -0.10, -0.2, 0.0, 0.0, 1.0,
            // 0.60, -0.10, -0.2, 0.0, 0.0, 1.0,

            // //Triango esquedo Vermelho

            // 0.75, 0.25, 0.0, 1., 0.0, 0.0,
            // 0.90, -0.35, 0.0, 1., 0.0, 0.0,
            // 0.60, -0.35, 0.0, 1., 0.0, 0.0,,
           


            // Vertex coordinates and color
            0.0, 2.5, -5.0, 0.4, 1.0, 0.4, // The green triangle
            -2.5, -2.5, -5.0, 0.4, 1.0, 0.4,
            2.5, -2.5, -5.0, 1.0, 0.4, 0.4,

            0.0, 3.0, -5.0, 1.0, 0.4, 0.4, // The yellow triagle
            -3.0, -3.0, -5.0, 1.0, 1.0, 0.4,
            3.0, -3.0, -5.0, 1.0, 1.0, 0.4, 

        ]);
        const FSIZE = verticies.BYTES_PER_ELEMENT;

        const trinangleBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, trinangleBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);

        const a_Position = this.gl.getAttribLocation(this.program, 'a_Position');
        this.gl.vertexAttribPointer(a_Position, 3, this.gl.FLOAT, false, FSIZE * 6, 0);
        this.gl.enableVertexAttribArray(a_Position);




        // a_Color

        const a_Color = this.gl.getAttribLocation(this.program, 'a_Color');
        this.gl.vertexAttribPointer(a_Color, 3, this.gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        this.gl.enableVertexAttribArray(a_Color);

        const u_ViewProjMatrix = this.gl.getUniformLocation(this.program, 'u_ViewProjMatrix');
 



        const viewMatrix = new this.Matrix4();
        const projMatrix = new this.Matrix4();

        viewMatrix.lookAt(3.06, 2.5, 10.0, 0, 0, -2, 0, 1, 0);
        projMatrix.setPerspective(30, this.canvas.width / this.canvas.height, 1, 100);


     
        this.gl.uniformMatrix4fv(u_ViewProjMatrix, false, projMatrix.elements);


        this.drawImage();
    }
    drawImage() {
        this.gl.clearColor(0, 0, 0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.POLYGON_OFFSET_FILL)
        this.gl.polygonOffset(1.0, 1.0)
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 18);
    }
}
