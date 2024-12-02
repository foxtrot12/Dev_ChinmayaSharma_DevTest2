class TextInput extends HTMLElement {
  constructor() {
    super();

    this.touched = false;

    this.attachShadow({ mode: "open" });

    const template = `
        <link rel="stylesheet" href="../styles.css" />
        <div class="textInput posRel wFull hFull flex">
          <input placeholder=" " class="textWhite inputActual ">
          <label class='posAbs padLeft10'></label>
        </div>
      `;

    this.shadowRoot.innerHTML = template;

    this.inputElement = this.shadowRoot.querySelector("input");
    this.labelElement = this.shadowRoot.querySelector("label");
  }

  static get observedAttributes() {
    return [
      "type",
      "id",
      "label",
      "autocomplete",
      "required",
      "name",
      "value",
      "placeholder",
    ];
  }

  onChange = (event) => {
    this.dispatchEvent(
      new CustomEvent("change", { detail: event.target.value })
    );
  };

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "label") {
      this.labelElement.textContent = newValue;
      this.labelElement.setAttribute("for", this.getAttribute("id") || "input");
    } else {
      this.inputElement.setAttribute(name, newValue);
    }
  }

  connectedCallback() {
    this.inputElement.addEventListener("change", this.onChange);
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("change", this.onChange);
  }
}

customElements.define("text-input", TextInput);
