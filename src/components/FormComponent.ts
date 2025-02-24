export class FormComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Good examples
    const goodForm = `
      <div>
        <h2>Accessible Form</h2>
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" />

          <input type="email" aria-label="Email address" />
        </form>
      </div>
    `;

    // Bad example
    const badForm = `
      <div>
        <h2>Inaccessible Form</h2>
        <form>
          <input type="text" /> <!-- No label or aria-label -->
        </form>
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = goodForm + badForm;
    }
  }
}

customElements.define('test-form', FormComponent); 