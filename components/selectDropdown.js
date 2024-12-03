class SelectDropdown extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="../styles.css" />
      <div class="selectDropdown posRel wFull hFull flex">
        <select class="selectActual posAbs hFull wFull"></select>
        <label class="hFull flex itemsCtr selectLabelActual padLeft10 wFull"></label>
        <svg class='flex selectAdorn' width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.99995 5L0.669823 -2.18762e-06L9.33008 -1.43051e-06L4.99995 5Z" fill="white"/>
        </svg>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.selectElement = this.shadowRoot.querySelector("select");
    this.labelElement = this.shadowRoot.querySelector("label");

    this.labelElement.textContent =
      this.getAttribute("initiallabel") || "Select an Option";
  }

  static get observedAttributes() {
    return [
      "options",
      "name",
      "id",
      "required",
      "multiple",
      "size",
      "disabled",
      "initiallabel",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "options") {
      this.updateOptions(JSON.parse(newValue));
    } else if (name === "initiallabel" && !this.selectElement.value) {
      this.labelElement.textContent = newValue || "Select an Option";
    } else {
      this.selectElement.setAttribute(name, newValue);
    }
  }

  connectedCallback() {
    this.selectElement.addEventListener("change", (event) => {
      const selectedOption = event.target.selectedOptions[0];
      this.labelElement.textContent = selectedOption
        ? selectedOption.textContent
        : this.getAttribute("initiallabel") || "Select an Option";

      this.dispatchEvent(
        new CustomEvent("change", { detail: event.target.value })
      );
    });
  }

  disconnectedCallback() {
    this.selectElement.removeEventListener("change", this.onChange);
  }

  updateOptions(options) {
    this.selectElement.innerHTML = "";

    options.forEach((option) => {
      const optionElement = document.createElement("option");

      optionElement.classList.add("optActual");
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      if (option.selected) {
        optionElement.setAttribute("selected", "");
      }
      this.selectElement.appendChild(optionElement);
    });
  }
}

customElements.define("select-dropdown", SelectDropdown);
