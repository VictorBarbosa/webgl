import { CanvasInitializator } from '../canvasInitializator.js';

export class Ex19 extends CanvasInitializator {

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

        const mvpMatrix = new this.Matrix4();
        mvpMatrix.setPerspective(60, 1, 1, 100);
        mvpMatrix.lookAt(3, 3, 3, 0, 0, 0, 0, 1, 0);

        const u_MvpMatrix = this.gl.getUniformLocation(this.program, 'u_MvpMatrix');
        this.gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

        const verticeColor = new Float32Array([
            1.0, 1.0, 1.0, 1.0, 1.0, 1.0,  // v0 White
            -1.0, 1.0, 1.0, 1.0, 0.0, 1.0,  // v1 Magenta
            -1.0, -1.0, 1.0, 1.0, 0.0, 0.0,  // v2 Red
            1.0, -1.0, 1.0, 1.0, 1.0, 0.0,  // v3 Yellow
            1.0, -1.0, -1.0, 0.0, 1.0, 0.0,  // v4 Green
            1.0, 1.0, -1.0, 0.0, 1.0, 1.0,  // v5 Cyan
            -1.0, 1.0, -1.0, 0.0, 0.0, 1.0,  // v6 Blue
            -1.0, -1.0, -1.0, 0.0, 0.0, 0.0   // v7 Black
        ]);


        // Indices of the vertices
        const indices = new Uint8Array([
            0, 1, 2, 0, 2, 3,    // front
            0, 3, 4, 0, 4, 5,    // right
            0, 5, 6, 0, 6, 1,    // up
            1, 6, 7, 1, 7, 2,    // left
            7, 4, 3, 7, 3, 2,    // down
            4, 7, 6, 4, 6, 5     // back
        ]);


        const bufferColor = this.gl.createBuffer()
        const FSIZE = verticeColor.BYTES_PER_ELEMENT;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferColor);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticeColor, this.gl.STATIC_DRAW)


        const a_Position = this.gl.getAttribLocation(this.program, 'a_Position');
        this.gl.vertexAttribPointer(a_Position, 3, this.gl.FLOAT, false, FSIZE * 6, 0);
        this.gl.enableVertexAttribArray(a_Position);

        const indexBuffer = this.gl.createBuffer()

        const color = this.gl.getAttribLocation(this.program, 'a_Color');
        this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        this.gl.enableVertexAttribArray(color);


        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indices, this.gl.STATIC_DRAW)

        // Pass the model view projection matrix to u_MvpMatrix
        this.gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

        // Clear color and depth buffer
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);



        this.gl.clearColor(0.0, 0.0, 0.0, .5);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Draw the cube
        this.gl.drawElements(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_BYTE, 0);
        // this.gl.drawElements(this.gl.LINE_LOOP, indices.length, this.gl.UNSIGNED_BYTE, 0);
    }

}