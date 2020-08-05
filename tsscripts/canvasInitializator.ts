declare const Matrix4;
export class CanvasInitializator {
    canvas: HTMLCanvasElement = document.getElementById('can') as HTMLCanvasElement;
    gl: WebGLRenderingContext = this.canvas.getContext("webgl");
    Matrix4 = Matrix4;
    insertOnBody(): HTMLDivElement {
        const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
        const div = document.createElement('div') as HTMLDivElement;
        body.append(div);

        return div;
    }
}