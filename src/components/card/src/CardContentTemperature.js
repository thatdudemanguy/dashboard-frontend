import { html, css, LitElement } from 'lit-element';

export class CardContentTemp extends LitElement {
  static get properties() {
    return {
      weatherData: { type: Object },
    };
  }

  static get styles() {
    return css`
    `;
  }

  render() {
    return html`
      <p>${this._fromFtoC(this.weatherData.AT.av).toFixed(2)}</p>
    `;
  }

  _fromFtoC(f) {
    return (f - 32) * (5 / 9);
  }
}