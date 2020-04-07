import { LitElement, html, css } from 'lit-element';
import '../card/dashboard-card.js'
import '../card/card-content-temperature.js'

export class DashboardCol extends LitElement {
  static get properties() {
    return {
    };
  }

  static get styles() {
    return css`
      :host {
        min-width: 350px;
      }
    `;
  }

  render() {
    return html`
      <slot name="col-content">
      
      </slot>
    `;
  }
}