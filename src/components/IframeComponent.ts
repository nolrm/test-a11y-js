export class IframeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Good example
    const goodIframe = `
      <div>
        <h2>Accessible Iframe</h2>
        <iframe 
          src="https://example.com" 
          title="Example content"
          width="500" 
          height="300">
        </iframe>
      </div>
    `;

    // Bad example
    const badIframe = `
      <div>
        <h2>Inaccessible Iframe</h2>
        <iframe 
          src="https://example.com" 
          width="500" 
          height="300">
        </iframe> <!-- Missing title -->
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = goodIframe + badIframe;
    }
  }
}

customElements.define('test-iframe', IframeComponent); 