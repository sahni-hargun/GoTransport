class Token {
    constructor(jwt) {
        this.jwt = jwt;
    }

    get() {
        return this.jwt;
    }
}
