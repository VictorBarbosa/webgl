import { CanvasInitializator } from '../canvasInitializator.js';;

export class Ex3 extends CanvasInitializator {
 
    divRange: HTMLDivElement = document.getElementById('divRange') as HTMLDivElement;
    verticex: Float32Array;
    program: WebGLProgram;
    position_x = 0.0;
    position_y = 0.0;
    position_z = 0.0;
    size_point = 10.0;

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
    sample(): void {
  
        this.divRange.style.display = "flex";
        this.divRange.style.visibility = "initial";


        const vertex_source = `
        attribute vec4 a_position;
        attribute float a_pointSize;
        void main(){
            gl_Position = a_position;
            gl_PointSize = a_pointSize;
        }
        `
        const fragment_source = `
        precision highp float;
        uniform vec4 color;
        void main(){
            gl_FragColor = color;
            
        }       
        `

        if (!this.initShaders(this.gl, vertex_source, fragment_source)) {
            alert("erro to inializate   ")
        }

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);


        //Color
        let color = this.gl.getUniformLocation(this.program, 'color');
        this.gl.uniform4fv(color, new Float32Array([1.0, 0.0, 0.0, 1.0]))

        document.getElementById('position_x').addEventListener('change', (ev: any) => {
            this.position_x = ev.target.value
            this.redraw();
        });
        document.getElementById('position_y').addEventListener('change', (ev: any) => {
            this.position_y = ev.target.value
            this.redraw();
        });
        document.getElementById('position_z').addEventListener('change', (ev: any) => {
            this.position_z = ev.target.value
            this.redraw();
        });

        document.getElementById('size_point').addEventListener('change', (ev: any) => {
            this.size_point = ev.target.value
            this.redraw();
        });



        // this.gl.vertex
        this.gl.drawArrays(this.gl.POINTS, 0, 1);

    }

    initShaders(gl: WebGLRenderingContext, vertex, fragment): boolean {
        let program = this.createProgram(gl, vertex, fragment)
        gl.useProgram(program);

        this.program = program;
        return true;
    }
    createProgram(gl: WebGLRenderingContext, vertex, fragment): WebGLProgram {
        let vertextShader = this.loadShader(gl, gl.VERTEX_SHADER, vertex);
        let fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fragment);


        let program = gl.createProgram();

        gl.attachShader(program, vertextShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Problem to link status");
        }

        return program;
    }

    loadShader(gl, type, source) {
        // Create a shader object 72 
        var shader = gl.createShader(type);
        // Set source codes of the shader 
        gl.shaderSource(shader, source);
        // Compile the shader 
        gl.compileShader(shader);
        // Check the result of compilation 85 
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        return shader;
    }
    redraw() {
        //Position
        const position = this.gl.getAttribLocation(this.program, 'a_position')
        this.gl.vertexAttrib3f(position, this.position_x, this.position_y, this.position_z);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // size
        let size = this.gl.getAttribLocation(this.program, 'a_pointSize');
        this.gl.vertexAttrib1f(size, this.size_point);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
    }


}