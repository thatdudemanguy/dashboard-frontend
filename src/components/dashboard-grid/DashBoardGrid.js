import { LitElement, html, css } from 'lit-element';
import '../card/dashboard-card.js'
import './dashboard-col.js'
import '../card/card-content-news-article.js'
import '../card/card-content-temperature.js'
import services from '../../services/services.js'
export class DashboardGrid extends LitElement {
  static get properties() {
    return {
      newsFeedFromNasaData: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.getNasaNewsFeed();
  }

  render() {
    return html`
      <dashboard-col>
          <dashboard-card slot="col-content" .title="${this.newsFeedFromNasaData[0].title}">
            <card-content-news-article slot="card-content" .newsFeedData="${this.newsFeedFromNasaData[0]}"/>
          </dashboard-card>
          <dashboard-card slot="col-content">
            <card-content-temperature slot="card-content"/>
          </dashboard-card>
          <dashboard-card slot="col-content">
            <card-content-temperature slot="card-content"/>
          </dashboard-card>
      </dashboard-col>
      <dashboard-col>
          <dashboard-card slot="col-content">
            <card-content-temperature slot="card-content"/>
          </dashboard-card>
          <dashboard-card slot="col-content">
            <card-content-temperature slot="card-content"/>
          </dashboard-card>
      </dashboard-col>
      <dashboard-col>
          <dashboard-card slot="col-content">
            <card-content-temperature slot="card-content"/>
          </dashboard-card>
          <dashboard-card slot="col-content">
            <card-content-temperature slot="card-content"/>
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

  _handleNewsFeedFromNasa(response) {
    if (!response || Object.keys(response).length === 0
      || response.constructor !== Object || !response.articles) {
      throw new Error('bad newsfeed data from nasa');
    }

    this.newsFeedFromNasaData = response.articles;
  }

  _showTechnicalError(e) {
    console.error(e);
  }
}