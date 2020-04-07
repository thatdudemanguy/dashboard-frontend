import { html, css, LitElement } from 'lit-element';
import { h2Style, pStyle, highlightedSpan } from '../../syle/fonts.js'

export class CardContentFunFact extends LitElement {
  static get properties() {
    return {
      funFact: { type: String },
    };
  }

  static get styles() {
    return [
      pStyle,
      highlightedSpan,
      css`
      
    `];
  }

  render() {
    return html`
      <p>${this.funFact}</p>
    `;
  }
}