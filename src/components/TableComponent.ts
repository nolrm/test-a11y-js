export class TableComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Good example
    const goodTable = `
      <div>
        <h2>Accessible Table</h2>
        <table>
          <caption>Monthly Sales Report</caption>
          <thead>
            <tr>
              <th>Month</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>January</td>
              <td>$1000</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // Bad example
    const badTable = `
      <div>
        <h2>Inaccessible Table</h2>
        <table> <!-- Missing caption -->
          <tr>
            <td>Month</td>
            <td>Sales</td>
          </tr>
        </table>
      </div>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = goodTable + badTable;
    }
  }
}

customElements.define('test-table', TableComponent); 