import { CanvasInitializator } from './canvasInitializator.js';
;
export class Ex2 extends CanvasInitializator {
    constructor() {
        super(...arguments);
        this.c_width = 0;
        this.c_height = 0.5;
    }
    sample() {
        window.onkeydown = (ev) => {
            this.checkKey(ev);
        };
    }
    checkKey(ev) {
        switch (ev.keyCode) {
            case 49:
                this.gl.clearColor(0.3, 0.7, 0.2, 1.0);
                this.clear(this.gl);
                break;
            case 50:
                this.gl.clearColor(0.3, 0.2, 0.7, 1.0);
                this.clear(this.gl);
                break;
            case 51:
                let color = this.gl.getParameter(this.gl.COLOR_CLEAR_VALUE);
                alert('clearColor = (' + Math.round(color[0] * 10) / 10 + ',' + Math.round(color[1] * 10) / 10 + ',' + Math.round(color[2] * 10) / 10 + ')');
                window.focus();
                break;
        }
    }
    clear(gl) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, this.c_width, this.c_height);
    }
}
