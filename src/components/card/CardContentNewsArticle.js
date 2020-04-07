import { html, css, LitElement } from 'lit-element';
import { h2Style, pStyle } from '../fonts.js'

export class CardContentNewsArticle extends LitElement {
  static get properties() {
    return {
      newsFeedData: { type: Object },
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
      <p>${this.newsFeedData.description}</p>
    `;
  }
}