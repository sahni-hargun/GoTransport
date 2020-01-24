class Router {
    constructor() {
        this.currentPage = Router.pages.login;
    }

    redirect(page, data) {
        this.currentPage = page;

        let event = new CustomEvent(Router.changePageEventName, {
            detail: {
                currentPage: page,
                data: data
            }
        })

        console.log(`Next page is ${page}`)
        document.dispatchEvent(event);
    }

    listen() {
        document.addEventListener(Router.changePageEventName, (e) => {
            let pages = document.body.querySelectorAll(`#${Router.pages.login}, #${Router.pages.scan}, #${Router.pages.result}`);
            let currentPage = e.detail.currentPage;
            // hide each page except current
            pages.forEach(page => page.hidden = page.id != currentPage);
        })
    }
}

Router.pages = {
    login: 'login',
    scan: 'scan',
    result: 'result'
}

Router.changePageEventName = 'changePage';
