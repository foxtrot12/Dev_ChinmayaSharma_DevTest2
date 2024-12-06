class VideoPlayer extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const url = this.getAttribute('url');

    this.stylesheetUrl = this.getAttribute('stylesheet')

    const template = document.createElement("template");
    template.innerHTML = `
        <link rel="stylesheet" href="${this.stylesheetUrl}" />
      <div class="flex videoPlayer posRel">
        <video id="vid" class="hFull wFull">
          <source src="${url}" />
        </video>
        <button id="playPause" class="btnClear cursorPtr posAbs videoBtn">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="100" fill="#5BC8AF" fill-opacity="0.1"/>
            <circle cx="100" cy="100" r="99" stroke="white" stroke-opacity="0.3" stroke-width="2"/>
            <circle cx="100" cy="100" r="76.0751" fill="#5BC8AF" fill-opacity="0.8" stroke="white" stroke-width="2"/>
            <path d="M120.619 96.3543C123.286 97.8939 123.286 101.743 120.619 103.283L89.4939 121.253C86.8272 122.792 83.4939 120.868 83.4939 117.789L83.4939 81.8482C83.4939 78.769 86.8272 76.8445 89.4939 78.3841L120.619 96.3543Z" fill="white"/>
          </svg>       
        </button>
      </div>
        `;

    shadow.appendChild(template.content.cloneNode(true));

    this.video = shadow.getElementById("vid");
    this.button = shadow.getElementById("playPause");

    this._handleButtonClick = this._handleButtonClick.bind(this);

    this.button.addEventListener("click", this._handleButtonClick);

    this.video.addEventListener("ended",this._handleVidEnd)
  }

  _handleVidEnd(){
    this.button.classList.remove('hide');
    this._fireCustomEvent(false)
  }

  _handleButtonClick() {
    if (this.video.paused) {
      this.video.play();
      this._fireCustomEvent(true); 
      this.button.classList.add('hide')
    } else {
      this.video.pause();
      this._fireCustomEvent(false); 
    }
  }

  _fireCustomEvent(isPlaying) {
    this.dispatchEvent(
      new CustomEvent("videoPlayStateChanged", {
        detail: {
          isPlaying: isPlaying,
        },
        bubbles: true,
        composed: true,
      })
    );
  }


  disconnectedCallback() {
    this.button.removeEventListener("click", this._handleButtonClick);
  }
}

customElements.define("video-player", VideoPlayer);
