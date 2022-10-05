class CanvasUtil {
    static create(doc) {
        let canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        canvas.style.margin = 0;
        canvas.style.padding = 0;

        document.body.appendChild(canvas);

        return canvas;
    }
}