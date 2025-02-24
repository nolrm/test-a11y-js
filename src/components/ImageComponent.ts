export class ImageComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Good example
    const goodImage = `
      <div>
        <h2>Accessible Image</h2>
        <img src="example.jpg" alt="A descriptive alt text" />
      </div>
    `;

    // Bad example
    const badImage = `
      <div>
        <h2>Inaccessible Image</h2>
        <img src="example.jpg" /> <!-- Missing alt -->
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = goodImage + badImage;
    }
  }
}

customElements.define('test-image', ImageComponent); 