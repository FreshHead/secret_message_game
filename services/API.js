const API = {
    fetchMenu: async () => {
        const socket = new WebSocket("ws://localhost:9000");
        socket.onopen = function() {
            console.log("Websocket connection is established!");
        };
        const result = await fetch(API.url);
        return await result.json();
    }
}

export default API;
