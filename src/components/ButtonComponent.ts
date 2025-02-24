export class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Good examples
    const goodButtons = `
      <div>
        <h2>Accessible Buttons</h2>
        <button>Click Me</button>
        <button aria-label="Close dialog">×</button>
      </div>
    `;

    // Bad example
    const badButtons = `
      <div>
        <h2>Inaccessible Buttons</h2>
        <button></button> <!-- No text or aria-label -->
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = goodButtons + badButtons;
    }
  }
}

customElements.define('test-button', ButtonComponent); 