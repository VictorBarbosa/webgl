import { CanvasInitializator } from './canvasInitializator.js';

export class Ex12 extends CanvasInitializator {
    sample() {
        this.gl.clearColor(0, 0, 0, .5);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}