export class CanvasInitializator {
    constructor() {
        this.canvas = document.getElementById('can');
        this.gl = this.canvas.getContext("webgl");
    }
}
