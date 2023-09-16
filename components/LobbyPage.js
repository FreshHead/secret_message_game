export default class MenuPage extends HTMLElement {
    constructor() {
        super();
    
        this.root = this.attachShadow({ mode: "open" });
    
        const template = document.getElementById("lobby-page-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);    
        this.root.appendChild(styles);

        async function loadCSS() {
          const request = await fetch("/components/LobbyPage.css");
          styles.textContent = await request.text();
        }
        loadCSS();
    }   

    connectedCallback() {
      this.render();
      window.addEventListener("appmenuchange", () => {
        this.render();
      });
    }

    render() {
      if (app.store.lobby) {
        this.root.querySelector("#lobby").innerHTML = "";
        for (let room of app.store.lobby) {
          const liRoom = document.createElement("li");
          liRoom.innerHTML = `
                <h3>${room.name}</h3>
                <ul class='room'>
                </ul>`;
          this.root.querySelector("#lobby").appendChild(liRoom);
        }  
      } else {
        this.root.querySelector("#lobby").innerHTML = `Loading...`;
      }
    }

}
