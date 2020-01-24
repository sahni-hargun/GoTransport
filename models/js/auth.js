class Auth {

    constructor(router) {
        this.login = 'elel';
        this.password = 'alo';
        this.router = router;
    }

    setToken() {
        let credentials = `${this.login}:${this.password}`;
        let token = new Token(Base64.encode(credentials)).get();

        window.localStorage.setItem(Auth.TOKEN_NAME, token);
        console.log(`Token ${token} was setted`);
    }

    listen() {
        let login_form = document.querySelector('#login_form');

        login_form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.login = login_form.querySelector('input[type="text"]').value;
            this.password = login_form.querySelector('input[type="password"]').value;
            this.setToken();

            let event = new CustomEvent(Auth.authenticatedEventName);
            document.dispatchEvent(event);

            this.router.redirect(Router.pages.scan);
        });

        document.addEventListener(Auth.authenticatedEventName, (e) => {
            // DOM
            let video = document.querySelector('#video');
            let preview = document.querySelector('#preview');

            // video capture
            let webcam = new Webcam(video, preview);
            webcam.capture();
            let qrScanner = new QRScanner(preview, router, webcam.captureArea);
            qrScanner.scan();
        });
    }

    static is_authenticated() {
        return !!window.localStorage.getItem(Auth.TOKEN_NAME);
    }
}

Auth.TOKEN_NAME = 'token';
Auth.authenticatedEventName = 'authenticated';
