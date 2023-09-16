import Router from './services/Router.js';
import Store from './services/Store.js';
import API from './services/API.js';

window.app = {}
app.router = Router;
app.store = Store;

window.addEventListener("DOMContentLoaded", () => {
    app.router.init();
    loadData();
});

navigator.serviceWorker.register("/serviceworker.js");
