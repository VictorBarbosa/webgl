export class Commun {

    static backgroundColor(gl: WebGLRenderingContext): void {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    /**
     * 
     * @param type Is FRAGMENT_SHADER ou VERTEX_SHADER
     */
    static createShader(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram {
        let program = gl.createProgram();
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            alert("Vertex compile error");
        }

        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            alert("Fragment compile error");
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Problem to link shaders")
        }
        gl.useProgram(program);
        return program
    }

    static initalPoint(gl: WebGLRenderingContext, program: WebGLProgram, size: Number = 10.0, location: Float32Array = new Float32Array([0.0, 0.0, 0.0])) {
        const color = gl.getUniformLocation(program, 'color');
        gl.uniform4fv(color, new Float32Array([1.0, 0.0, 0.0, 1.0]));
    }
    static drawScene(gl: WebGLRenderingContext){
        gl.drawArrays(gl.POINTS,0,1);
    }

}