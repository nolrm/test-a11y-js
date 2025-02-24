export class LinkComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Good examples
    const goodLinks = `
      <div>
        <h2>Accessible Links</h2>
        <a href="/about">About Us</a>
        <a href="/menu" aria-label="View our restaurant menu">Menu</a>
      </div>
    `;

    // Bad examples
    const badLinks = `
      <div>
        <h2>Inaccessible Links</h2>
        <a href="#"></a> <!-- No text or aria-label -->
        <a href="/more">click here</a> <!-- Non-descriptive text -->
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = goodLinks + badLinks;
    }
  }
}

customElements.define('test-link', LinkComponent); 