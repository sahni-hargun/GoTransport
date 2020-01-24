class QRScanner {
    constructor(canvas, router, captureArea) {
        this.canvas = canvas;
        this.router = router;
        this.captureArea = captureArea;
        this.qrCode = null;
    }

    scan() {
        setInterval(() => {
            let imageData = this.canvas
                .getContext('2d')
                .getImageData(
                    this.captureArea.x,
                    this.captureArea.y,
                    this.captureArea.width,
                    this.captureArea.height
                ).data;

            // parsing qr code from canvas
            this.qrCode = jsQR(imageData, this.captureArea.width, this.captureArea.height);

            if (this.qrCode) {
                router.redirect(Router.pages.result, this.qrCode);
                let resultPage = document.querySelector('#result .qr-code-data');
                resultPage.innerHTML = this.qrCode.data;
            }
        }, 100);
    }
}
