class CTA extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    this.button = document.createElement("button");
    this.text = document.createElement("p");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const style = document.createElement("style");

    // Set up button attributes
    this.button.setAttribute("class", this._getButtonClass());
    this.button.setAttribute("type", this.getAttribute("type") || "button");
    const formAttr = this.getAttribute("form");
    if (formAttr) {
      this.button.setAttribute("form", formAttr);
    }

    // Set up text
    this.text.textContent = this.getAttribute("text") || "Submit";

    // Handle different CTA types
    const ctaType = this.getAttribute("ctatype");
    if (ctaType === "secondary") {
      svg.setAttribute("width", "17");
      svg.setAttribute("height", "14");
      svg.setAttribute("viewBox", "0 0 17 14");
      svg.setAttribute("fill", "none");
      svg.innerHTML = `
        <path 
          fill-rule="evenodd" 
          clip-rule="evenodd" 
          d="M11.3431 0.92888L16.7071 6.29284C17.0976 6.68336 17.0976 7.31653 16.7071 7.70705L11.3431 13.071C10.9526 13.4615 10.3195 13.4615 9.92893 13.071C9.53841 12.6805 9.53841 12.0473 9.92893 11.6568L13.5858 7.99995H0V5.99995H13.5858L9.92893 2.34309C9.53841 1.95257 9.53841 1.3194 9.92893 0.92888C10.3195 0.538355 10.9526 0.538355 11.3431 0.92888Z" 
          fill="#5BC8AF"
        />
      `;
      this.button.appendChild(this.text);
      this.button.appendChild(svg);
    } else {
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
      this.button.appendChild(svg);
      this.button.appendChild(this.text);
    }

    // Add external stylesheet link if provided
    const stylesheetUrl = this.getAttribute("stylesheet");
    if (stylesheetUrl) {
      shadow.innerHTML = `<link rel="stylesheet" href="${stylesheetUrl}" />`;
    }

    // Append elements to shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(this.button);

    // Add click event listener to emit a custom event
    this.button.addEventListener("click", () => {
      const clickEvent = new CustomEvent("cta-click", {
        detail: {
          text: this.getAttribute("text") || "Submit",
          ctaType: this.getAttribute("ctatype") || "primary",
        },
        bubbles: true, // Allows the event to bubble up through the DOM
        composed: true, // Allows the event to cross the shadow DOM boundary
      });
      this.dispatchEvent(clickEvent);
    });
  }

  static get formAssociated() {
    return this.getAttribute('form') ?? false;
  }

  _getButtonClass() {
    const ctaType = this.getAttribute("ctatype");
    const baseClass =
      "hFull cta verHorCenter font18 text700 flex wFull btnClear";
    return ctaType === "secondary"
      ? `${baseClass} secondaryCta`
      : `${baseClass} primaryCta`;
  }

  static get observedAttributes() {
    return ["text", "ctatype"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.text.textContent = newValue || "Submit";
    } else if (name === "ctatype") {
      this.button.setAttribute("class", this._getButtonClass());
    }
  }
}

customElements.define("cta-btn", CTA);
