
import { MatrixWebGl } from '../node_modules/matrixwebgl/src/index.js';
 

class ElementRanger {
    ranger: HTMLInputElement;
    labelCurrent: HTMLLabelElement;

    constructor(div: HTMLDivElement, min: string = "0.0", max: string = "0.0", step: string = "0.0", initialValue: string = "0.0", title: string = "Title") {
        const divContent = document.createElement('div') as HTMLDivElement;
        div.appendChild(divContent);

        const label = document.createElement('label') as HTMLLabelElement;
        this.ranger = document.createElement('input') as HTMLInputElement;
        this.labelCurrent = document.createElement('label') as HTMLLabelElement;
        this.ranger.type = 'range'
        this.ranger.min = min
        this.ranger.max = max
        this.ranger.step = step
        this.ranger.value = initialValue;
        this.labelCurrent.innerHTML = " Current : " + initialValue;
        label.innerHTML = title

        divContent.appendChild(label);
        divContent.appendChild(this.labelCurrent);
        divContent.appendChild(this.ranger);

    }
}
export class CanvasInitializator {
    vertexSource: string = null;
    fragmentSource: string = null;
    canvas: HTMLCanvasElement = document.getElementById('can') as HTMLCanvasElement;
    gl: WebGLRenderingContext = this.canvas.getContext("webgl");
    Matrix4 = MatrixWebGl;
    program: WebGLProgram;

    async getFileShader(exName: string) {
        this.vertexSource = await (await fetch(`shaders/${exName}/vertexSource.glsl`)).text()
        this.fragmentSource = await (await fetch(`shaders/${exName}/fragmentSource.glsl`)).text()
    }
    rangerY(div: HTMLDivElement, changeCallback: Function) {
        const element = new ElementRanger(div, '-1.0', '1.0', '0.1', '0.0', 'Axis  Y');
        element.ranger.onchange = (ev: any) => {
            element.labelCurrent.innerHTML = " Current : " + element.ranger.value;
            changeCallback(ev)
        };

    }
    rangerX(div: HTMLDivElement, changeCallback: Function) {
        const element = new ElementRanger(div, '-1.0', '1.0', '0.1', '0.0', 'Axis  X');
        element.ranger.onchange = (ev: any) => {
            element.labelCurrent.innerHTML = " Current - " + element.ranger.value;
            changeCallback(ev)
        };

    }
    rangerZ(div: HTMLDivElement, changeCallback: Function) {
        const element = new ElementRanger(div, '-1.0', '1.0', '0.1', '0.0', 'Axis  Z');
        element.ranger.onchange = (ev: any) => {
            element.labelCurrent.innerHTML = " Current - " + element.ranger.value;
            changeCallback(ev)
        };

    }
    near(div: HTMLDivElement, changeCallback: Function) {
        const element = new ElementRanger(div, '-10.0', '10.0', '0.1', '0.0', 'Near');
        element.ranger.onchange = (ev: any) => {
            element.labelCurrent.innerHTML = " Current - " + element.ranger.value;
            changeCallback(ev)
        };

    }
    far(div: HTMLDivElement, changeCallback: Function) {
        const element = new ElementRanger(div, '-10.0', '10.0', '0.1', '0.0', 'Far');
        element.ranger.onchange = (ev: any) => {
            element.labelCurrent.innerHTML = " Current - " + element.ranger.value;
            changeCallback(ev)
        };

    }
    rangerW(div: HTMLDivElement, changeCallback: Function) {
        const element = new ElementRanger(div, '-1.0', '1.0', '0.1', '0.0', 'Axis  W');
        element.ranger.onchange = (ev: any) => {
            element.labelCurrent.innerHTML = " Current - " + element.ranger.value;
            changeCallback(ev)
        };

    }
    rotation(div: HTMLDivElement, changeCallback: Function) {
        const element = new ElementRanger(div, '0.0', '180.0', '1.5', '0.0', 'Rotate');
        element.ranger.onchange = (ev: any) => {
            element.labelCurrent.innerHTML = " Current - " + element.ranger.value;
            changeCallback(ev)
        };

    }
    insertOnBody(): HTMLDivElement {
        const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
        const div = document.createElement('div') as HTMLDivElement;
        body.append(div);
        return div;
    }
    compileShader(shader: WebGLShader, type) {
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert(`Error ${type}`);
        }
    }

    draw(mode: number, first: number, count: number) {
        this.gl.clearColor(0, 0, 0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);


        this.gl.drawArrays(mode, first, count);
    }


}