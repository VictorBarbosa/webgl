export class Ex1 {
}
Ex1.Sample = () => {
    const canvas = document.getElementById('can');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        alert("Não funciona!!");
    }
    const verterxSource = () => {
        return `attribute vec2 position;
        void main() {
            gl_Position = vec4(position, 0.0, 1.0);
        }`;
    };
    const fragmentSource = () => {
        return `
            precision highp float;
        uniform vec4 color;
        void main(){
            gl_FragColor =  color;
        }
        `;
    };
    gl.clearColor(1, 0, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, verterxSource());
    gl.compileShader(vertexShader);
    let fragmentShared = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShared, fragmentSource());
    gl.compileShader(fragmentShared);
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShared);
    gl.linkProgram(program);
    let vertice = new Float32Array([
        -1, -1,
        0, 1,
        1, -1
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertice, gl.STATIC_DRAW);
    gl.useProgram(program);
    program.color = gl.getUniformLocation(program, 'color');
    gl.uniform4fv(program.color, [0, 1, 0, 1.0]);
    program.position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(program.position);
    gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, vertice.length / 2);
};
