import { LitElement, html, css } from 'lit-element';
import '../spinner/SpinnerIcon.js'
import 'weightless/card/card.js'

import { white, black } from '../color.js';
import { spacer8, spacer4 } from '../spacing.js';

export class DashboardCard extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      isLoading: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.isLoading = false;
  }

  static get styles() {
    return css`
      spinner-icon {
        --main-color: ${black};
      }

      wl-card {
        margin: ${spacer4};
        padding: ${spacer8};
      }
    `;
  }

  render() {
    return html`
      <wl-card>
        ${this.isLoading ? html`
          <spinner-icon></spinner-icon>
        ` : html`
          <h2 class="card_title">
              Hey
          </h2>
          <slot name="card-content"></slot>
        `}
      </wl-card>
    `;
  }
}