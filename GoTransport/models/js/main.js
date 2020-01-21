// waiting for page changing
let router = new Router();
router.listen();

// check auth token
let auth = new Auth(router);
auth.listen();

if (!Auth.is_authenticated()) {
    router.redirect(Router.pages.login);
} else {
    router.redirect(Router.pages.scan);
    // re-asking camera allow
    let event = new CustomEvent(Auth.authenticatedEventName)
    document.dispatchEvent(event);
}

document.querySelector('#result button').addEventListener('click', () => {
    router.redirect(Router.pages.scan);
})
