class CTA extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    this.button = document.createElement("button");
    this.button.setAttribute("class", this._getButtonClass());

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "21");
    svg.setAttribute("height", "18");
    svg.setAttribute("viewBox", "0 0 21 18");
    svg.setAttribute("fill", "none");
    svg.innerHTML = `
        <path
          d="M0.00999999 18L21 9L0.00999999 0L0 7L15 9L0 11L0.00999999 18Z"
          fill="white"
        />
      `;

    this.text = document.createElement("p");
    this.text.textContent = this.getAttribute("text") || "Submit";

    this.button.appendChild(svg);
    this.button.appendChild(this.text);

    const style = document.createElement("style");

    shadow.innerHTML = `<link rel="stylesheet" href="../styles.css" /> `;
    shadow.appendChild(style);
    shadow.appendChild(this.button);
  }

  _getButtonClass() {
    const type = this.getAttribute("type");
    const baseClass =
      "hFull cta verHorCenter font18 text700 flex wFull btnClear";
    return type === "secondary"
      ? `${baseClass} secondaryCta`
      : `${baseClass} primaryCta`;
  }

  static get observedAttributes() {
    return ["text", "type"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.text.textContent = newValue || "Submit";
    } else if (name === "type") {
      this.button.setAttribute("class", this._getButtonClass());
    }
  }
}

customElements.define("cta-btn", CTA);
