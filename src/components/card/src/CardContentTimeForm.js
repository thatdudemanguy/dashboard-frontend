import { html, css, LitElement } from 'lit-element';
import { h2Style, pStyle, highlightedSpan } from '../../syle/fonts.js'

import services from '../../../services/services.js';
import '@lion/form/lion-form.js';
import 'weightless/textfield/textfield.js'
import 'weightless/textarea/textarea.js'
import 'weightless/checkbox/checkbox.js'
import 'weightless/button/button.js'
import { highlight, darkerHighligt } from '../../syle/color.js';
import { spacer8 } from '../../syle/spacing.js';

export class CardContentTimeForm extends LitElement {
  static get properties() {
    return {
      userInput: { type: Object },
    };
  }

  static get styles() {
    return [
      pStyle,
      highlightedSpan,
      css`
        wl-button {
          --button-bg-hover: ${darkerHighligt};
          --button-bg: ${highlight};
        }

        form div {
          margin-top: ${spacer8};
          display: flex;
          justify-content: space-between;
        }

        form div span {
          font-size: 0.8em;
        }

        wl-checkbox: {
          --checkbox-size: 12px;
        }
    `];
  }

  constructor() {
    super();
    this.userInput = {
      title: '',
      description: '',
      longDescription: '',
      state: 0,
    }
  }

  render() {
    return html`
      <lion-form id="form" @submit="${this.submit}">
        <form>
          <wl-textfield  @input="${e => this.userInput.title = e.target.value}" label="Titel"></wl-textfield>
          <wl-textfield @input="${e => this.userInput.description = e.target.value}" label="Description"></wl-textfield>
          <wl-textarea @input="${e => this.userInput.longDescription = e.target.value}" label="Long desc."></wl-textarea>
          <div>

            <span>
              Done:
              <wl-checkbox @change="${e => this.userInput.state = (e.detail === true ? 1 : 0)}"></wl-checkbox>
            </span>
            <wl-button>Add</wl-button>
          </div>
        </form>
      </lion-form>
    `;
  }

  submit = async () => {
    const form = this.shadowRoot.querySelector('#form');
    if (!form.hasFeedbackFor.includes('error')) {
      await new Promise((resolve) => {
        resolve(services.postTimetracker(this.userInput));
      }).then((response) => {
        const event = new CustomEvent('updateTimetrackData', {
          bubbles: true,
          detail: response,
        });
        this.dispatchEvent(event);
      }).catch((e) => {
        console.log(e);
      });
    }
  };

}