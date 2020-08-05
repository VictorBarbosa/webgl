export class CanvasInitializator {
    constructor() {
        this.canvas = document.getElementById('can');
        this.gl = this.canvas.getContext("webgl");
        this.Matrix4 = Matrix4;
    }
    insertOnBody() {
        const body = document.getElementsByTagName('body')[0];
        const div = document.createElement('div');
        body.append(div);
        return div;
    }
}
