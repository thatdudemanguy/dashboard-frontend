import { html, css, LitElement } from 'lit-element';
import { h2Style, pStyle, highlightedSpan } from '../../syle/fonts.js'

export class CardContentNewsArticle extends LitElement {
  static get properties() {
    return {
      newsFeedData: { type: Object },
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
      <p>${this.newsFeedData.description} <span>${this.newsFeedData.publishedAt.substring(0, 10)}</span></p>
    `;
  }
}