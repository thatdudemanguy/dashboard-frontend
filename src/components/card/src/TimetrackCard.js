
import { LitElement, html, css } from 'lit-element';
import '../../spinner/spinner-icon.js';
import 'weightless/card/card.js';
import 'weightless/expansion/expansion.js';
import 'weightless/icon/icon.js';
import 'weightless/checkbox/checkbox.js';
import services from '../../../services/services.js'
import { white, black, highlight } from '../../syle/color.js';
import { spacer8, spacer4, spacer16, spacer12, spacer2 } from '../../syle/spacing.js';
import { h2Style, highlightedSpan } from '../../syle/fonts.js'

export class TimetrackCard extends LitElement {
  static get properties() {
    return {
      isLoading: { type: Boolean },
      isError: { type: Boolean },
      timeData: { type: Object },
      imageSource: { type: String },
    };
  }

  constructor() {
    super();
    this.isLoading = false;
    this.isError = false;
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

      img.error {
        align-self: center;
        max-width: 60px;
      }

      img.header_image {
        object-fit: cover;
        max-height: 125px;
      }

      wl-card {
        overflow: hidden;
        margin: ${spacer12} 0;
      }

      .card_content {
        padding: ${spacer16};
      }

      wl-expansion {
        margin-top: unset;
        margin-bottom: unset;
        --expansion-color: black;
        --expansion-header-description-color: ${highlight};
        font-size: 0.8em;
      }
      
      wl-expansion div {
        display: flex;
      }
      
      div wl-checkbox {
        --checkbox-size: 12px;
        align-self: center;
        margin: ${spacer4};
        margin-left: unset;
      }
    `];
  }

  render() {
    return html`
      <wl-card>
        ${this.isError ? html`
          <img class="error" src="../../../images/icons8-sad-cloud-80.png"/>
        ` :
        this.isLoading ? html`
          <spinner-icon></spinner-icon>
        ` : html`
          ${this.imageSource ? html`
            <img class="header_image" src="${this.imageSource}"/>
          ` : ''}

          <wl-expansion .icon="warning" name="group">
            <span slot="title">${this.timeData.title}</span>
            <span slot="description">//${this.timeData.description}</span>
            <div>
              <wl-checkbox .checked="${this.timeData.state === 1 ? true : false}" @change="${e => services.patchTimetrackerEntry(e.detail, this.timeData._id)}"></wl-checkbox>
              <p>${this.timeData.longDescription}</p>
            </div>
            <slot name="card-content"></slot>
          </wl-expansion>
        `}
      </wl-card>
    `}
}

