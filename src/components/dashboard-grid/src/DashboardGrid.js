import { LitElement, html, css } from 'lit-element';
import '../dashboard-col.js'

import '../../card/dashboard-card.js'
import '../../card/timetrack-card.js'
import '../../card/card-content-news-article.js'
import '../../card/card-content-temperature.js'
import '../../card/card-content-time-form.js'
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
      timetrackerData: { type: Array },
      funFactsError: { type: Boolean },
      earthWeatherError: { type: Boolean },
      marsWeatherError: { type: Boolean },
      randomGeekJokeError: { type: Boolean },
      timetrackerError: { type: Boolean },
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
    this.marsWeatherData = { First_UTC: '' };
  }

  connectedCallback() {
    super.connectedCallback();
    this.getNasaNewsFeed();
    this.getRandomMathFunFact();
    this.getRandomGeekJoke();
    this.getEarthWeather();
    this.getMarsWeather();
    this.getTimetracker();
  }

  render() {
    return html`
      <dashboard-col>
        <dashboard-card slot="col-content">
          <card-content-time-form id="form" slot="card-content"><card-content-time-form>
        </dashboard-card>
        ${this.timetrackerData.map(this._timetrackerMapper)}
      </dashboard-col>
      <dashboard-col>
        <dashboard-card slot="col-content" .title="Weather on Mars, sol ${this.marsWeatherData.lastSOL} (UTC: ${this.marsWeatherData.First_UTC.substring(0, 10)})" .isError="${this.weatherOnMarsError}" .isLoading="${!this.marsWeatherData}">
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

  firstUpdated() {
    super.firstUpdated();
    this.shadowRoot.querySelector('#form').addEventListener('updateTimetrackData', e => { this._updateTimetrackData(e, this) });
    const allTimeItems = this.shadowRoot.querySelectorAll('.timetracker');
    allTimeItems.forEach(time => console.log(time));
    allTimeItems.forEach(time => time.addEventListener('deleteTimetrackData', e => { this._deleteTimetrackData(e, this) }));
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

  async getTimetracker() {
    await new Promise((resolve) => {
      resolve(services.getTimetracker());
    }).then((response) => {
      this._handleTimetracker(response);
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
      throw new Error('bad data from geek jokes');
    }

    this.randomGeekJoke = response;
  }

  _handleEarthWeather(response) {
    if (this._checkIntegrity(response) && !response) {
      this.earthWeatherError = true;
      throw new Error('bad data from Earth weather');
    }

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

  _handleTimetracker(response) {
    if (!response) {
      this.timetrackerError = true;
      throw new Error('bad data from time tracker');
    }
    this.timetrackerData = response;
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

  _timetrackerMapper(entry) {
    return html`
      <timetrack-card class="timetracker" slot="col-content" .timeData="${entry}"></timetrack-card>
    `;
  }

  _updateTimetrackData(e, context) {
    const [...oldItems] = context.timetrackerData;
    context.timetrackerData = [...oldItems, e.detail];
  }

  _deleteTimetrackData(e, context) {
    const id = context.timetrackerData.findIndex(x => x._id === 'e.detail._id');
    console.log(id);
    // const [...oldItems] = context.timetrackerData;
    // context.timetrackerData = [...oldItems, e.detail];
  }

  _showTechnicalError(e) {
    console.error(e);
  }
}