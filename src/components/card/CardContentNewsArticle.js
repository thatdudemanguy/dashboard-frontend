import { html, css, LitElement } from 'lit-element';

export class CardContentNewsArticle extends LitElement {
  static get properties() {
    return {
      newsFeedData: { type: Object },
    };
  }

  static get styles() {
    return css`
    `;
  }

  render() {
    return html`
      <p>${this.newsFeedData.title}</p>
    `;
  }
}