
export default class LoginPage extends HTMLElement {
    constructor() {
        super();
    
        this.root = this.attachShadow({ mode: "open" });
    
        const template = document.getElementById("login-page-template");
        const content = template.content.cloneNode(true);
        const styles = document.createElement("style");
        this.root.appendChild(content);    
        this.root.appendChild(styles);

        async function loadCSS() {
          const request = await fetch("/components/LoginPage.css");
          styles.textContent = await request.text();
        }
        loadCSS();
    }   

    connectedCallback() {
      this.render();
      window.addEventListener("appmenuchange", () => {
        // this.render();
      });
    }

    render() {
    }

}
