class TooltipElement extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        this.stylesheetUrl = this.getAttribute('stylesheet')

        this.tooltipTxt = this.getAttribute('tooltiptext');

        this.txt = this.getAttribute('text');

        const template = document.createElement('template');
        template.innerHTML = `
        <link rel="stylesheet" href="${this.stylesheetUrl}" />
          <div class="tooltip-container posRel flex wFull verHorCenter cursorPtr">
            <span class="text700 nonTooltipTex"t>${this.txt}</span>
            <span class="tooltip-text">             
            <svg class="posAbs tip" width="22" height="9" viewBox="0 0 22 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 0L22 9H0L11 0Z" fill="#297C6B"/>
            </svg> ${this.tooltipTxt}</span>
            <span class="tooltip-icon">&#9432;</span>
          </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        // const container = shadow.querySelector('.tooltip-container');
        // const tooltipText = shadow.querySelector('.tooltip-text');
        // tooltipText.textContent = this.getAttribute('tooltiptext');

        // const textSpan = document.createElement('span');
        // textSpan.classList.add('text700')
        // textSpan.classList.add('nonTooltipText')
        // textSpan.textContent = this.getAttribute('text');
        // container.insertBefore(textSpan, tooltipText);
    }
}

customElements.define('tooltip-element', TooltipElement);
