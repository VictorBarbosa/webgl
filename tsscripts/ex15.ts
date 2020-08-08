import { CanvasInitializator } from './canvasInitializator.js';

const vertexSource = `
 attribute vec4 a_Position;  
 attribute vec2 a_TexCoord;  
 varying vec2 v_TexCoord; 
 
 void main(){
   gl_Position = a_Position; 
   v_TexCoord = a_TexCoord;
}

`

const fragmentSource = `
precision highp float;
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main(){
gl_FragColor = texture2D(u_Sampler, v_TexCoord);
 
}

`
export class Ex15 extends CanvasInitializator {
    angle = 0.0;
    x = 0.0;
    y = 0.0;
    z = 0.0;
    sample() {
        this.program = this.gl.createProgram();
    


        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexSource);
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            alert('Error {Vertex}');
        }
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentSource);
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            alert('Error {fragment}');
        }
        // const div = this.insertOnBody();

        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            alert("Error {Link}")
        }

        var verticesTexCoords = new Float32Array([
            -0.5, 0.5, 0.0, 1.0,
            -0.5, -0.5, 0.0, 0.0,
            0.5, 0.5, 1.0, 1.0,
            0.5, -0.5, 1.0, 0.0,


        ]);

        let n = 4;

        var vertexTexCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexTexCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, verticesTexCoords, this.gl.STATIC_DRAW);

        let FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;


        const position = this.gl.getAttribLocation(this.program, 'a_Position');
        this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, FSIZE * 4, 0);
        this.gl.enableVertexAttribArray(position);


        const texCoord = this.gl.getAttribLocation(this.program, 'a_TexCoord');
        this.gl.vertexAttribPointer(texCoord, 2, this.gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
        this.gl.enableVertexAttribArray(texCoord);





        const texture = this.gl.createTexture();

        const sampler = this.gl.getUniformLocation(this.program, 'u_Sampler');
        let image = new Image()

        image.onload = () => {
            this.loadTexture(n, texture, sampler, image);
        };

        image.src = '../resources/sky.jpg';
    }
    loadTexture(n: number, texture, u_Sampler, image) {
        const gl = this.gl;

        // 1
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
        // 2
        this.gl.activeTexture(this.gl.TEXTURE0);
        // 3
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        // 4
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        // 5
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, image);
        // 6
        this.gl.uniform1i(u_Sampler, 0);

        this.gl.clearColor(0, 0.0, 0, 0.5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        // 7
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, n);

    }
}
