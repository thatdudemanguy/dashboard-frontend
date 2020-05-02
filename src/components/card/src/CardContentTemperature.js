import { html, css, LitElement } from 'lit-element';
import { spacer2, spacer8, spacer16 } from '../../syle/spacing';
import { pStyle, h3Style } from '../../syle/fonts';

export class CardContentTemp extends LitElement {
  static get properties() {
    return {
      weatherData: { type: Object },
    };
  }

  static get styles() {
    return [
      h3Style,
      css`
        p {
          margin: unset;
        }

        .first_p {
          text-align: center;
          padding-top: ${spacer8};
        }

        .data_sub {
          display: flex;
          justify-content: center;
          font-size: 0.7em; 
        }

        .data_sub p {
          margin: ${spacer2};
        }

        .data_sub__compass, .hws_av {
          text-align: center;
        }

        img {
          height: 20px;
          margin: ${spacer8};
        }
        
        .hws_av, .compass_point {
          margin-top: ${spacer8};
        }

        .first_p, .hws_av, .compass_point {
          font-weight: bold;
        }

        h3 {
          margin-top: ${spacer16};
          text-align: center;
        }
    `];
  }

  render() {
    return html`
      <h3>Temperature</h3>
      <p class="first_p">${this._fromFtoC(this.weatherData.AT.av).toFixed(2)}°c</p>
      <div class="data_sub">
        <p>min: ${this._fromFtoC(this.weatherData.AT.mn).toFixed(2)}°c</p>
        <p>max: ${this._fromFtoC(this.weatherData.AT.mx).toFixed(2)}°c</p>
      </div>

      <h3>Wind</h3>
      <p class="hws_av">${this.weatherData.HWS.av}m/s</p>

      ${this.weatherData.HWS.mn ?
        html`
          <div class="data_sub">
            <p>min: ${this.weatherData.HWS.mn}m/s</p>
            <p>max: ${this.weatherData.HWS.mx.toFixed(2)}m/s</p>
          </div>
        `
        : ''
      }
      <div class="data_sub__compass">
        <!-- <p class="compass_point">${this.weatherData.WD.most_common.compass_point}</p> -->
        <img src="../../../images/arrow.png" style="transform: rotate(${this.weatherData.WD.most_common.compass_degrees}deg)"/>
      </div>
    `;
  }

  _fromFtoC(f) {
    return (f - 32) * (5 / 9);
  }
}