import { LitElement, html, css } from 'lit-element';
import '../dashboard-col.js'

import '../../card/dashboard-card.js'
import '../../card/card-content-news-article.js'
import '../../card/card-content-temperature.js'
import '../../card/card-content-quote.js'
import '../../card/card-content-fun-fact.js'
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import '@lion/form/lion-form.js';
import 'weightless/textfield/textfield.js'
import 'weightless/button/button.js'
import services from '../../../services/services.js'

export class DashboardGrid extends LitElement {
  static get properties() {
    return {
      newsFeedFromNasaData: { type: Array },
      randomMathFunFact: { type: String },
      randomGeekJoke: { type: String },
      earthWeatherData: { type: Object },
      marsWeatherData: { type: Object },
      timetrackerData: { type: Object },
      userInput: { type: Object },
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
    this.userInput = {
      title: '',
      description: '',
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // this.getNasaNewsFeed();
    // this.getRandomMathFunFact();
    // this.getRandomGeekJoke();
    // this.getEarthWeather();
    // this.getMarsWeather();

    this.getTimetracker();
  }

  render() {
    return html`
      <dashboard-col>
        <dashboard-card slot="col-content">
        <lion-form id="form" slot="card-content" @submit="${this.submit}">
          <form>
            <wl-textfield @input="${e => this.userInput.title = e.target.value}" label="Titel"></wl-textfield>
            <wl-textfield @input="${e => this.userInput.description = e.target.value}" label="Description"></wl-textfield>
            <wl-button @click="${e => console.log('clicked/spaced/entered', e)}">Add</wl-button>
          </form>
        </lion-form>

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

    console.log(response.articles);
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
    console.log(response);
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
      <dashboard-card slot="col-content" .title="${entry.title}" .author="${entry.description}"></dashboard-card>
    `;
  }

  submit = async () => {
    const form = this.shadowRoot.querySelector('#form');
  
    if (!form.hasFeedbackFor.includes('error')) {
      await new Promise((resolve) => {
        resolve(services.postTimetracker(this.userInput));
      }).then((response) => {
        const [...oldItems] = this.timetrackerData;
        this.timetrackerData = [...oldItems, response];
      }).catch((e) => {
        this._showTechnicalError(e);
      });
    }
  };
  

  _showTechnicalError(e) {
    console.error(e);
  }
}