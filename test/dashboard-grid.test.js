import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/dashboard-grid/dashboard-grid.js';
import { fakeServer, spy } from 'sinon';
import services from '../src/services/services.js';
import { MockDataMixin } from './mock-data.js';

describe('DashboardGrid', () => {
  let element;
  let server;

  // beforeEach(async () => {
  //   element = await fixture(html`<dashboard-grid></dashboard-grid>`);
  // });

  // it('validate component', () => {
  //   expect(element.tagName).to.equal('DASHBOARD-GRID');
  // });

  describe('services', () => {
    beforeEach(() => {
      server = fakeServer.create();
      server.respondImmediately = true;
    });

    afterEach(() => {
      server.restore();
    });

    it('getNewsFeedByQuestion || success', async () => {
      const response = MockDataMixin.getMockDataNewsFeedByQuestion();

      server.respondWith(/\/api\/v1\/news/, JSON.stringify(response));
      const testData = await services.getNewsFeedByQuestion('nasa');

      expect(testData).to.be.an('Object');
      expect(testData).to.not.be.empty;
      expect(testData).to.eql(response);
    });
  });

  describe('handler & helper', () => {
    /**
     * checks integiry of object, expects certain value. 
     */
    it('_checkIntegrity of object', () => {
      expect(element._checkIntegrity({})).to.be.false;
      expect(element._checkIntegrity({ 'details': 'foo', 'bar': 'foobar' })).to.be.true;
      expect(element._checkIntegrity(123)).to.be.false;
      expect(element._checkIntegrity('123')).to.be.false;
      expect(element._checkIntegrity('aze123&é"&é"&')).to.be.false;
      expect(element._checkIntegrity([0, 1, 1])).to.be.false;
    });

    it.only('_handleGeekJoke || expect error', () => {
      expect(() => element._handleGeekJoke()).to.throw(Error);
    });

    it.only('_handleGeekJoke || success', () => {
      element._handleGeekJoke('foobar');
      expect(element.randomGeekJoke).to.equal('foobar');
    });
  });
});