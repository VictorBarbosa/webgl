import { CanvasInitializator } from '../canvasInitializator.js';


export class Ex16 extends CanvasInitializator {
    /**
     *
     */
    x = 0.20;
    y = 0.25;
    z = 0.25;
    // x = 0;
    // y = 0;
    // z = 0.1;
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
        this.compileShader(vertexShader, 'Vertex')

        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, this.fragmentSource);
        this.compileShader(fragmentShader, 'Fragment')


        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Error {Link}")
        }


        const greenTriangle = [

            0.0, 0.5, -0.4, 0.0, 1.0, 0.0,
            -0.5, -0.5, -0.4, 0.0, 1.0, 0.0,
            0.5, -0.5, -0.4, 0.0, 1.0, 0.0,
        ]

        const yellowTriangleZ = [-.2];
        const yellowColor = [1.0, 1.0, 0.0]
        const yellowTriangle = [

            0.5, 0.4, ...yellowTriangleZ, ...yellowColor,
            -0.5, 0.4, ...yellowTriangleZ, ...yellowColor,
            0.0, -0.6, ...yellowTriangleZ, ...yellowColor,
        ]
        const blueTriangle = [

            0.0, 0.5, -.0, 0.0, 0.0, 1.0,
            -0.5, -0.5, -.0, 0.0, 0.0, 1.0,
            0.5, -0.5, -.0, 0.0, 0.0, 1.0,

        ]
        const blackTriangle = [

            -0.0, -0.5, .2, 0.0, 0.0, 0.0,
            0.5, 0.5, .2, 0.0, 0.0, 0.0,
            -0.5, 0.5, .2, 0.0, 0.0, 0.0,

        ]






        const greenSquareZ = [-0.4]
        const greenSquareColor = [0.0, 1.0, 0.0]
        const greenSquare = [

            -0.5, 0.5, ...greenSquareZ, ...greenSquareColor,
            -0.5, -0.5, ...greenSquareZ, ...greenSquareColor,
            0.5, 0.5, ...greenSquareZ, ...greenSquareColor,
            0.5, -0.5, ...greenSquareZ, ...greenSquareColor,

        ]


        const verticesTriangles = new Float32Array([

            ...greenTriangle,
            ...yellowTriangle,
            ...blueTriangle,
            ...blackTriangle,
        ])


        const FSIZE = verticesTriangles.BYTES_PER_ELEMENT
        const buffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticesTriangles, this.gl.STREAM_DRAW);

        const a_Position = this.gl.getAttribLocation(this.program, 'a_Position');
        this.gl.vertexAttribPointer(a_Position, 3, this.gl.FLOAT, false, FSIZE * 6, 0);
        this.gl.enableVertexAttribArray(a_Position);



        const a_Color = this.gl.getAttribLocation(this.program, 'a_Color');
        this.gl.vertexAttribPointer(a_Color, 3, this.gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        this.gl.enableVertexAttribArray(a_Color);


        // Unbind the buffer object
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);






        const div = this.insertOnBody();
        this.rangerX(div, (ev) => {
            this.x = parseFloat(ev.target.value);
            this.drawImages();
        })
        this.rangerY(div, (ev) => {
            this.y = parseFloat(ev.target.value);
            this.drawImages();
        })
        this.rangerZ(div, (ev) => {
            this.z = parseFloat(ev.target.value);
            this.drawImages();
        })
        this.drawImages();

    }
    drawImages() {
        this.gl.clearColor(0, 0, 0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        const uViewMatrix = this.gl.getUniformLocation(this.program, 'u_ViewMatrix');
        const matrix = new this.Matrix4();
        matrix.setLookAt(this.x, this.y, this.z, 0, 0, 0, 0, 1, 0);
        // matrix.setLookAt(0.20, .25, .25, 0, 0, 0, 0, 1, 0);
        this.gl.uniformMatrix4fv(uViewMatrix, false, matrix.elements)

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 12);

    }
}