import { html, css, LitElement } from 'lit-element';
import {  pStyle } from '../../syle/fonts.js'

export class CardContentQuote extends LitElement {
  static get properties() {
    return {
      quote: { type: String },
      source: { type: String },
      author: { type: String },
    };
  }

  static get styles() {
    return [
      pStyle,
      css`
      
    `];
  }

  render() {
    return html`
      <p>${this.quote}</p>
      <!-- <p>${this.source}</p> -->
      <!-- <p>${this.author}</p> -->
    `;
  }
}