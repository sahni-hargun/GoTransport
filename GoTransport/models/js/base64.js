class Base64 {
    static encode(str) {
        return btoa(str);
    }

    static decode(hash) {
        return atob(hash);
    }
}
