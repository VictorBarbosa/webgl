declare const Matrix4;

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
        var chanc = this.ranger.onchange


    }
}
export class CanvasInitializator {
    canvas: HTMLCanvasElement = document.getElementById('can') as HTMLCanvasElement;
    gl: WebGLRenderingContext = this.canvas.getContext("webgl");
    Matrix4 = Matrix4;
    program: WebGLProgram;

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
}