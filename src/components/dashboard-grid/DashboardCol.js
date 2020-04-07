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
        width: 350px;
        height: 100vh;
        overflow: scroll;
      }
      /* Hide scrollbar for Chrome, Safari and Opera */
      :host::-webkit-scrollbar {
        display: none;
      }

      /* Hide scrollbar for IE and Edge */
      :host {
        -ms-overflow-style: none;
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