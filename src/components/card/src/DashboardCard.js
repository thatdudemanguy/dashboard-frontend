import { LitElement, html, css } from 'lit-element';
import '../../spinner/spinner-icon.js'
import 'weightless/card/card.js'

import { white, black, highlight } from '../../syle/color.js';
import { spacer8, spacer4, spacer16, spacer12 } from '../../syle/spacing.js';
import { h2Style, highlightedSpan } from '../../syle/fonts.js'

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
    // is the data still loading? 
    this.isLoading = false;
  }

  static get styles() {
    return [
      h2Style,
      highlightedSpan,
      css`

      spinner-icon {
        text-align: center;
        --main-color: ${highlight};
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
      ${this.linkSource ? html`
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
      ` : html`
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
      `}
    `;
  }
}