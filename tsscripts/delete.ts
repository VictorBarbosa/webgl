import { CanvasInitializator } from './canvasInitializator.js';


export class ToDelete extends CanvasInitializator {

    sample() {

        this.program = this.gl.createProgram();

        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, this.vertexSource);
        this.compileShader(vertexShader, 'vertex');


        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, this.fragmentSource);
        this.compileShader(fragmentShader, 'Fragment');

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);

        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);


        const viewMatrix = this.gl.getUniformLocation(this.program, 'viewMatrix');

        // const matrix = new 



    }


}

