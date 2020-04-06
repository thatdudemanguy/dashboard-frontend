import { LitElement, html, css } from 'lit-element';
import '../card/dashboard-card.js'
import '../card/card-content-temperature.js'

export class DashboardGrid extends LitElement {
  static get properties() {
    return {
    };
  }

  static get styles() {
    return css`

    `;
  }

  render() {
    return html`
      <dashboard-card>
        <card-content-temperature slot="card-content"/>
      </dashboard-card>
    `;
  }
}