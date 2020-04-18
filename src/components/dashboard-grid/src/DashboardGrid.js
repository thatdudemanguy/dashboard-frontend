import { LitElement, html, css } from 'lit-element';
import '../dashboard-col.js'

import '../../card/dashboard-card.js'
import '../../card/card-content-news-article.js'
import '../../card/card-content-temperature.js'
import '../../card/card-content-quote.js'
import '../../card/card-content-fun-fact.js'

import services from '../../../services/services.js'

export class DashboardGrid extends LitElement {
  static get properties() {
    return {
      newsFeedFromNasaData: { type: Array },
      randomMathFunFact: { type: String },
      randomGeekJoke: { type: String },
      earthWeatherData: { type: Object },
      marsWeatherData: { type: Object },
      funFactsError: { type: Boolean },
      earthWeatherError: { type: Boolean },
      marsWeatherError: { type: Boolean },
      randomGeekJokeError: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
    `;
  }

  constructor() {
    super();
    this.newsFeedFromNasaData = [];
  }

  connectedCallback() {
    super.connectedCallback();
    // this.getRandomMathFunFact();
    this.getNasaNewsFeed();
    // this.getRandomGeekJoke();
    // this.getEarthWeather();
    // this.getMarsWeather();
  }

  render() {
    return html`
      <dashboard-col>
        <dashboard-card slot="col-content" .title="Weather on Mars, sol ${this.marsWeatherData.lastSOL} (UTC: ${this.marsWeatherData.First_UTC.substring(0, 10)})" .isError="${this.weatherOnMarsError}" .isLoading="${!this.marsWeatherData}">
          <!-- <card-content-temperature slot="card-content" .weatherData=${this.earthWeatherData}></card-content-temperature> -->
          <card-content-temperature slot="card-content" .weatherData=${this.marsWeatherData}></card-content-temperature>
        </dashboard-card>
      </dashboard-col>
      <dashboard-col>
        ${this.newsFeedFromNasaData.map(this._newsArticleMapper)}
      </dashboard-col>
      <dashboard-col>
        <dashboard-card slot="col-content" .isError="${this.funFactsError}" .isLoading="${!this.randomMathFunFact}">
          <card-content-fun-fact slot="card-content" .funFact="${this.randomMathFunFact}"></card-content-fun-fact>
        </dashboard-card>
        <dashboard-card slot="col-content" .isError="${this.randomGeekJokeError}" .isLoading="${!this.randomGeekJoke}">
          <card-content-quote slot="card-content" .quote="${this.randomGeekJoke}"></card-content-quote>
        </dashboard-card>
      </dashboard-col>
    `;
  }

  async getNasaNewsFeed() {
    await new Promise((resolve) => {
      resolve(services.getNewsFeedByQuestion('nasa'));
    }).then((response) => {
      this._handleNewsFeedFromNasa(response);
    }).catch((e) => {
      this._showTechnicalError(e);
    });
  }

  async getRandomMathFunFact() {
    await new Promise((resolve) => {
      resolve(services.getRandomMathFunFact());
    }).then((response) => {
      this._handleRandomMathFunFact(response);
    }).catch((e) => {
      this._showTechnicalError(e);
    });
  }

  async getRandomGeekJoke() {
    await new Promise((resolve) => {
      resolve(services.getGeekJoke());
    }).then((response) => {
      this._handleGeekJoke(response);
    }).catch((e) => {
      this._showTechnicalError(e);
    });
  }

  async getEarthWeather() {
    await new Promise((resolve) => {
      resolve(services.getEarthWeather());
    }).then((response) => {
      this._handleEarthWeather(response);
    }).catch((e) => {
      this._showTechnicalError(e);
    });
  }
  
  async getMarsWeather() {
    await new Promise((resolve) => {
      resolve(services.getMarsWeather());
    }).then((response) => {
      this._handleMarsWeather(response);
    }).catch((e) => {
      this._showTechnicalError(e);
    });
  }

  _handleNewsFeedFromNasa(response) {
    if (this._checkIntegrity(response) && !response.articles) {
      throw new Error('bad newsfeed data from nasa');
    }

    this.newsFeedFromNasaData = response.articles;
  }

  _handleRandomMathFunFact(response) {
    if (!response) {
      this.funFactsError = true;
      throw new Error('bad data from maths fun fact');
    }
    
    this.randomMathFunFact = response;
  }

  _handleGeekJoke(response) {
    if (!response) {
      this.randomGeekJokeError = true;
      throw new Error('bad data from maths fun fact');
    }

    this.randomGeekJoke = response;
  }

  _handleEarthWeather(response) {
    if (this._checkIntegrity(response) && !response) {
      this.earthWeatherError = true;
      throw new Error('bad data from Earth weather');
    }

    console.log(response);
    this.earthWeatherData = response;
  }

  _handleMarsWeather(response) {
    if (this._checkIntegrity(response) && !response) {
      this.marsWeatherError = true;
      throw new Error('bad data from Mars weather');
    }
    const lastSOL = response.sol_keys[response.sol_keys.length - 1];
    this.marsWeatherData = response[lastSOL];
    this.marsWeatherData.lastSOL = lastSOL;
  }

  _checkIntegrity(response) {
    if (!response || Object.keys(response).length === 0 || response.constructor !== Object) {
      return false;
    }
    return true;
  }

  _newsArticleMapper(article) {
    return html`
      <dashboard-card slot="col-content" .title="${article.title}" .author="${article.author}" 
        .imageSource="${article.urlToImage}" .linkSource="${article.url}">
        <card-content-news-article slot="card-content" .newsFeedData="${article}"/>
      </dashboard-card>
    `;
  }

  _showTechnicalError(e) {
    console.error(e);
  }
}