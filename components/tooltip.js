class TooltipElement extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
        <link rel="stylesheet" href="../styles.css" />
          <div class="tooltip-container posRel flex wFull verHorCenter cursorPtr">
            <span class="tooltip-text"></span>
            <span class="tooltip-icon">&#9432;</span>
          </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        const container = shadow.querySelector('.tooltip-container');
        const tooltipText = shadow.querySelector('.tooltip-text');
        tooltipText.textContent = this.getAttribute('tooltiptext');

        const textSpan = document.createElement('span');
        textSpan.classList.add('text700')
        textSpan.textContent = this.getAttribute('text');
        container.insertBefore(textSpan, tooltipText);
    }
}

customElements.define('tooltip-element', TooltipElement);
