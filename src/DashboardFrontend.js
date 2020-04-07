import { LitElement, html, css } from 'lit-element';
import './components/dashboard-grid/dashboard-grid.js'

export class DashboardFrontend extends LitElement {
  static get properties() {
    return {
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
      }
    `;
  }

  render() {
    return html`
      <dashboard-grid></dashboard-grid>
    `;
  }

  createRenderRoot() {
    return this;
  }
}
