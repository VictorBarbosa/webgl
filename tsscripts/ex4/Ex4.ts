import { Commun } from '../common.js';
import { CanvasInitializator } from '../canvasInitializator.js';


interface G_Point {
    x,
    y
}
export class Ex4 extends CanvasInitializator {


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
    // g_points = new Array<G_Point>();
    g_points = [];
    g_colors = [];
    async sample() {




        this.canvas.width = 400;
        this.canvas.height = 400;

        let program = Commun.createShader(this.gl, this.vertexSource, this.fragmentSource);
        Commun.backgroundColor(this.gl);
        Commun.initalPoint(this.gl, program);
        Commun.drawScene(this.gl);

        const a_position = this.gl.getAttribLocation(program, 'a_position');
        const color = this.gl.getUniformLocation(program, 'color');

        this.canvas.onmousemove = (ev) => this.mouseCick(ev, this.gl, this.canvas, a_position, color)
    }

    private mouseCick(ev: MouseEvent, gl: WebGLRenderingContext, canvas: HTMLCanvasElement, a_Position, color) {

        let x = ev.clientX;
        let y = ev.clientY;


        let rect = (ev.target as HTMLElement).getBoundingClientRect();


        x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
        y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
        // Store the coordinates to a_points array <- (1) 
        this.g_points.push(x); this.g_points.push(y);



        if (x >= 0 && y >= 0) {
            this.g_colors.push([1.0, 0.0, 0.0, 1.0]);
            // gl.uniform4fv(color, new Float32Array([1.0, 0.0, 0.0, 1.0]))
        } else if (x < 0.0 && y < 0.0) {
            this.g_colors.push([0.0, 1.0, 0.0, 1.0]);
            // gl.uniform4fv(color, new Float32Array([0.0, 1.0, 0.0, 1.0]))
        } else {
            this.g_colors.push([1.0, 1.0, 1.0, 1.0]);
            // gl.uniform4fv(color, new Float32Array([1.0, 1.0, 1.0, 1.0]))
        }

        var len = this.g_points.length;


        gl.clear(gl.COLOR_BUFFER_BIT);

        for (var i = 0; i < len; i += 2) {
            // Pass the position of a point to a_Position variable <- (3) 
            gl.vertexAttrib3f(a_Position, this.g_points[i], this.g_points[i + 1], 0.0);
            const rgba = this.g_colors[i];

            if (rgba) {
                gl.uniform4f(color, rgba[0], rgba[1], rgba[2], rgba[3])
            }

            gl.drawArrays(gl.POINTS, 0, 1);
        }

    }
}