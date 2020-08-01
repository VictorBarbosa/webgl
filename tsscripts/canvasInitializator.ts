export class CanvasInitializator {
    canvas: HTMLCanvasElement = document.getElementById('can') as HTMLCanvasElement;
    gl: WebGLRenderingContext = this.canvas.getContext("webgl");
}