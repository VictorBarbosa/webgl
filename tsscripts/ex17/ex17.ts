

import { CanvasInitializator } from '../canvasInitializator.js';






export class Ex17 extends CanvasInitializator {
    /**
     *
     */
    x = 0.25;
    nearValue = 0.0;
    farValue = 0.5;
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


        
 
       
        this.gl.clearColor(0, 0, 0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);



        this.program = this.gl.createProgram();

        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
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




            0.0, 0.6, -0.6, 0.4, 1.0, 0.4, // The back green one
            -0.5, -0.4, -0.6, 0.4, 1.0, 0.4,
            0.5, -0.4, -0.6, 1.0, 0.4, 0.4,

            0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // The middle yellow one
            -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
            0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

            0.0, 0.5, 0.0, 0.4, 0.4, 1.0, // The front blue one 
            -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
            0.5, -0.5, 0.0, 1.0, 0.4, 0.4,



        ]);
        const FSIZE = verticies.BYTES_PER_ELEMENT;
        const triangleBuffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, triangleBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticies, this.gl.STATIC_DRAW);

        const position = this.gl.getAttribLocation(this.program, 'a_Position');
        this.gl.vertexAttribPointer(position, 3, this.gl.FLOAT, false, FSIZE * 6, 0);
        this.gl.enableVertexAttribArray(position);



        const color = this.gl.getAttribLocation(this.program, 'a_Color');
        this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        this.gl.enableVertexAttribArray(color)


        // const matrix = new this.Matrix4();
         
        const matrix = new this.Matrix4();



        matrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
        const u_ModelViewMatrix = this.gl.getUniformLocation(this.program, 'u_ModelViewMatrix');
        this.gl.uniformMatrix4fv(u_ModelViewMatrix, false, matrix.elements);


        const div = this.insertOnBody();
        this.rangerX(div, (ev) => {


            this.x = parseFloat(ev.target.value);
            matrix.setOrtho(-1.0, 1.0, -1.0, 1.0, this.nearValue, this.farValue);
            matrix.setLookAt(this.x, 0.25, 0.25, 0, 0, 0, 0, 1, 0);


            this.gl.uniformMatrix4fv(u_ModelViewMatrix, false, matrix.elements);

            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 9);
        })
        this.far(div, (ev) => {

            const data = new this.Matrix4();



            this.farValue = parseFloat(ev.target.value);

            data.setLookAt(this.x, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
            matrix.setOrtho(-1.0, 1.0, -1.0, 1.0, this.nearValue, this.farValue);


            this.gl.uniformMatrix4fv(u_ModelViewMatrix, false, matrix.elements);

            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 9);
        })
        this.near(div, (ev) => {

            this.nearValue = parseFloat(ev.target.value);
            matrix.setLookAt(this.x, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
            matrix.setOrtho(-1.0, 1.0, -1.0, 1.0, this.nearValue, this.farValue);
            this.gl.uniformMatrix4fv(u_ModelViewMatrix, false, matrix.elements);

            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 9);
        })



        this.gl.drawArrays(this.gl.TRIANGLES, 0, 9);

    }
}