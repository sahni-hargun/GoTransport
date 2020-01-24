class Webcam {
    constructor(videoTag, canvasTag) {
        // using for real-time video capture
        this.videoTag = videoTag;
        // qr scanner parses imageData from this element
        this.canvasTag = canvasTag;
        // waiting for qr code here
        this.captureArea = {
            x: 100,
            y: 60,
            width: 120,
            height: 120
        }

        // getting access to webcam
        navigator.mediaDevices
            .getUserMedia({
                video: true
            })
            .then(stream => this.videoTag.srcObject = stream)
            .catch(console.log);
    }

    capture() {
        // tmp storage for captured data
        let canvas = document.createElement('canvas');

        setInterval(() => {
            let ctx = this.canvasTag.getContext('2d');
            canvas.getContext('2d').drawImage(this.videoTag, 0, 0, 320, 240);
            ctx.drawImage(canvas, 0, 0, 320, 240);
            // drawing capture area
            ctx.strokeStyle = 'red';
            // this arguments also should be passed into qr scanner
            ctx.strokeRect(
                this.captureArea.x,
                this.captureArea.y,
                this.captureArea.width,
                this.captureArea.height
            );
        }, 100);
    }
}
