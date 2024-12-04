class CardCarousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.imageData = [];
        this.handleNavigation = this.handleNavigation.bind(this); // Bind once for reuse
    }

    connectedCallback() {
        this.loadAttributes();
        this.render();
        this.attachEventListeners();
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    loadAttributes() {
        this.imageData = JSON.parse(this.getAttribute('cards') || '[]');
    }

    render() {
        if (!this.imageData.length) return;

        // Generate cards markup
        const cardsMarkup = this.imageData
            .map(
                ({ url, heading, content }, index) => `
            <div class="flex grow carasInner ${index === this.currentIndex ? 'shown' : 'hidden'}" data-index="${index}">
                <img class="flex" src="${url}">
                <div class="flex carasCard contentCtr col posRel">
                    <p class="flex textWhite text700">${heading}</p>
                    <p class="flex italic textWhite text400">${content}</p>
                    <svg class="posAbs cardQte" width="60" height="47" viewBox="0 0 60 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.5804 21.9794C21.9114 22.9931 23.7296 24.5137 25.035 26.5412C26.3403 28.5686 26.993 30.9647 26.993 33.7294C26.993 37.6922 25.7343 40.9176 23.2168 43.4059C20.6993 45.802 17.4825 47 13.5664 47C9.65035 47 6.38695 45.7559 3.77622 43.2676C1.25874 40.7794 0 37.6 0 33.7294C0 31.8863 0.2331 30.0431 0.699301 28.2C1.1655 26.3569 2.19114 23.5922 3.77622 19.9059L11.8881 0H25.7343L19.5804 21.9794ZM52.5874 21.9794C54.9184 22.9931 56.7366 24.5137 58.042 26.5412C59.3473 28.5686 60 30.9647 60 33.7294C60 37.6922 58.7413 40.9176 56.2238 43.4059C53.7063 45.802 50.4895 47 46.5734 47C42.6573 47 39.3939 45.7559 36.7832 43.2676C34.2657 40.7794 33.007 37.6 33.007 33.7294C33.007 31.8863 33.2401 30.0431 33.7063 28.2C34.1725 26.3569 35.1981 23.5922 36.7832 19.9059L44.8951 0H58.7413L52.5874 21.9794Z"
                            fill="#2A7C6B" />
                    </svg>
                </div>
            </div>
            `
            )
            .join('');

        // Generate dots markup
        const dotsMarkup = this.imageData
            .map(
                (_, index) => `
            <svg class="dot ${index === this.currentIndex ? 'activeDot' : ''}" data-index="${index}" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#EAEAEA"/>
            </svg>
            `
            )
            .join('');

        // Final template
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../styles.css" />
            <div class="flex col caras verHorCenter stdPadding">
            <div class='flex'>
                <button class="btnClear carBtn cursorPtr prev">
                    <svg class="flex" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.24 39.76L20.48 24L36.24 8.24L32 4L12 24L32 44L36.24 39.76Z" fill="#EAEAEA" />
                    </svg>
                </button>
                ${cardsMarkup}
                <button class="btnClear carBtn cursorPtr next">
                    <svg class="flex" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.76 8.24L27.52 24L11.76 39.76L16 44L36 24L16 4L11.76 8.24Z" fill="#EAEAEA" />
                    </svg>
                </button>
            </div>
            <div class='flex dotCont spcBw'> 
                ${dotsMarkup}
            </div>
            </div>
        `;
    }

    navigate(direction) {
        const cards = this.shadowRoot.querySelectorAll('.carasInner');
        const dots = this.shadowRoot.querySelectorAll('.dot');

        // Update card visibility
        cards[this.currentIndex].classList.remove('shown');
        cards[this.currentIndex].classList.add('hidden');

        // Update dot styles
        dots[this.currentIndex].classList.remove('activeDot');

        // Update index
        this.currentIndex = (this.currentIndex + direction + this.imageData.length) % this.imageData.length;

        // Apply updated styles
        cards[this.currentIndex].classList.remove('hidden');
        cards[this.currentIndex].classList.add('shown');
        dots[this.currentIndex].classList.add('activeDot');
    }

    attachEventListeners() {
        this.shadowRoot.addEventListener('click', this.handleNavigation);
    }

    removeEventListeners() {
        this.shadowRoot.removeEventListener('click', this.handleNavigation);
    }

    handleNavigation(event) {
        const target = event.target.closest('button');
        if (!target) return;

        if (target.classList.contains('prev')) {
            this.navigate(-1);
        } else if (target.classList.contains('next')) {
            this.navigate(1);
        }
    }
}

customElements.define('card-carousel', CardCarousel);
