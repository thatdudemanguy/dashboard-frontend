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
      funFactsError: { type: Boolean },
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
    this.getRandomMathFunFact();
    // this.getNasaNewsFeed();
    this.getRandomGeekJoke();
  }

  render() {
    return html`
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

  _handleNewsFeedFromNasa(response) {
    if (this._checkIntegrity(response) && !response.articles) {
      throw new Error('bad newsfeed data from nasa');
    }

    this.newsFeedFromNasaData = response.articles;
    // console.log(this.newsFeedFromNasaData);
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

  _checkIntegrity(response) {
    if (!response || Object.keys(response).length === 0 || response.constructor !== Object) {
      return false;
    }
    return true;
  }

  _newsArticleMapper(article) {
    return html`
      <dashboard-card slot="col-content" .title="${article.title}" .author="${article.author}" .imageSource="${article.urlToImage}" .linkSource="${article.url}">
        <card-content-news-article slot="card-content" .newsFeedData="${article}"/>
      </dashboard-card>
    `;
  }

  _showTechnicalError(e) {
    console.error(e);
  }
}