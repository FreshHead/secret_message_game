import API from './API.js'

const Store = {
    userName: null,
    roomList: [],
}

const proxiedStore = new Proxy(Store, {
    set(target, property, value) {
        target[property] = value;
        if (property == "roomList") {
            window.dispatchEvent(new Event("approomschange"));
        }
        return true;
    },
    get(target, property) {
        return target[property]
    }
}
)

export default proxiedStore;
