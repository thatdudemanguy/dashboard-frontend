import { LitElement, html, css } from 'lit-element';
import '../dashboard-col.js'

import '../../card/dashboard-card.js'
import '../../card/card-content-news-article.js'
import '../../card/card-content-temperature.js'
import '../../card/card-content-fun-fact.js'

import services from '../../../services/services.js'

export class DashboardGrid extends LitElement {
  static get properties() {
    return {
      newsFeedFromNasaData: { type: Array },
      randomMathFunFact: { type: String },
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
    //this.getNasaNewsFeed();
  }

  render() {
    return html`
      <dashboard-col>
        ${this.newsFeedFromNasaData.map(this._newsArticleMapper)}
      </dashboard-col>
      <dashboard-col>
        <dashboard-card slot="col-content" title="Fun facts" .isLoading="${!this.randomMathFunFact}">
          <card-content-fun-fact slot="card-content" .funFact="${this.randomMathFunFact}"/>
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

  _handleNewsFeedFromNasa(response) {
    if (this._checkIntegrity(response) && !response.articles) {
      throw new Error('bad newsfeed data from nasa');
    }

    this.newsFeedFromNasaData = response.articles;
    // console.log(this.newsFeedFromNasaData);
  }

  _handleRandomMathFunFact(response) {
    if (!response) {
      throw new Error('bad data from maths fun fact');
    }

    this.randomMathFunFact = response;
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