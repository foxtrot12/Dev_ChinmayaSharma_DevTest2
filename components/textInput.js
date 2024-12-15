class TextInput extends HTMLElement {

  constructor() {
    super();
    this.touched = false;

    this.attachShadow({ mode: "open" });

    this.stylesheetUrl = this.getAttribute('stylesheet')
    this.errorMessage = this.getAttribute('errorMessage') ?? false
    this.formId = this.getAttribute('form')
    this.internals = this.attachInternals();

    const template = `
        <link rel="stylesheet" href="${this.stylesheetUrl}" />
        <div class="textInput posRel wFull hFull flex">
          <input form="${this.formId}" placeholder=" " class="textWhite inputActual ">
          <label class='posAbs padLeft10'></label>
          ${this.errorMessage ? ('<div class="errorMsg posAbs">' + this.errorMessage + '</div>') : ''}
        </div>
      `;

    this.shadowRoot.innerHTML = template;

    this.inputElement = this.shadowRoot.querySelector("input");
    this.labelElement = this.shadowRoot.querySelector("label");
  }

  static get formAssociated() {
    return true;
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
      "errorMessage",
      "form"
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {

    if (name === "label") {
      this.labelElement.textContent = newValue;
      this.labelElement.setAttribute("for", this.getAttribute("id") || "input");
    } else {
      this.inputElement.setAttribute(name, newValue);
    }

 if (name === 'pattern') {
      this.inputElement.pattern = newValue || '';
      this.checkValidity();
    } else if (name === 'maxlength') {
      this.inputElement.maxLength = newValue !== null ? parseInt(newValue, 10) : -1;
      this.checkValidity();
    } else if (name === 'disabled') {
      this.inputElement.disabled = newValue !== null;
    } else if (name === 'value') {
      this.value = newValue || '';
      this.checkValidity();
    }
  }

  onChange = (event) => {
    this.checkValidity();
    this.dispatchEvent(
      new CustomEvent("change", { detail: event.target.value })
    );
  };

  connectedCallback() {
    this.inputElement.addEventListener("change", this.onChange);
    this.checkValidity();
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("change", this.onChange);
  }

  checkValidity() {
    const valid = this.inputElement.checkValidity();

    if (!valid) {
      this.internals.setValidity(this.inputElement.validity, this.errorMessage, this.inputElement);
    } else {
      this.internals.setValidity({});
    }

    return valid;
  }
}

customElements.define("text-input", TextInput);
