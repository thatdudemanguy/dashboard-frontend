import { LitElement, html, css } from 'lit-element';
import '../spinner/SpinnerIcon.js'
import 'weightless/card/card.js'

import { white, black } from '../color.js';
import { spacer8, spacer4, spacer16, spacer12 } from '../spacing.js';
import { h2Style, highlightedSpan } from '../fonts.js'

export class DashboardCard extends LitElement {
  static get properties() {
    return {
      isLoading: { type: Boolean },
      title: { type: String },
      imageSource: { type: String },
      author: { type: String },
      linkSource: { type: String },
    };
  }

  constructor() {
    super();
    this.isLoading = false;
  }

  static get styles() {
    return [
      h2Style,
      highlightedSpan,
      css`
      spinner-icon {
        --main-color: ${black};
      }

      img {
        object-fit: cover;
        max-height: 125px;
      }

      wl-card {
        overflow: hidden;
        margin: ${spacer12};
      }

      .card_content {
        padding: ${spacer16};
      }

      a {
        text-decoration: none; /* no underline */
      }
    `];
  }

  render() {
    return html`
      <a href="${this.linkSource}" target="blank">
        <wl-card>
          ${this.isLoading ? html`
          <spinner-icon></spinner-icon>
          ` : html`
          ${this.imageSource ?  html`
          <img src="${this.imageSource}"/>
          ` : ''}
          <div class="card_content">
            <h2 class="card_title">${this.title}
              ${this.author ? html`
              <span>// ${this.author}</span>
              ` : ''}
            </h2>
            <slot name="card-content"></slot>
          </div>
          `}
        </wl-card>
      </a>
    `;
  }


}