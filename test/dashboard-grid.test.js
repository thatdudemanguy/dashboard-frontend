/* eslint-disable-next-line */
import { html, fixture, expect } from '@open-wc/testing';
import '../src/components/dashboard-grid/dashboard-grid.js';
import { fakeServer } from 'sinon';
import services from '../src/services/services.js';
import { MockDataMixin } from './mock-data.js';

describe('DashboardGrid', () => {
  let element;
  let server;
  const headers = { 'Content-type': 'application/json' };

  beforeEach(async () => {
    server = fakeServer.create();
    server.respondImmediately = true;
    server.respondWith(/\/api\/v1\/news/, JSON.stringify(MockDataMixin.getMockDataNewsFeedByQuestion()));
    server.respondWith(/\/api\/v1\/fact/, JSON.stringify(MockDataMixin.getMockDataMathFunFact()));
    server.respondWith(/\/api\/v1\/joke/, JSON.stringify(MockDataMixin.getMockDataGeekJoke()));
    server.respondWith(/\/api\/v1\/weather/, JSON.stringify(MockDataMixin.getMockDataEarthWeather()));
    server.respondWith(/\/api\/v1\/nasa/, JSON.stringify(MockDataMixin.getMockDataMarsWeather()));
    server.respondWith(/\/api\/v1\/timetracker/, JSON.stringify(MockDataMixin.getMockDataTimeTracker()));
    element = await fixture(html`<dashboard-grid></dashboard-grid>`);
  });

  afterEach(() => {
    server.restore();
  });

  it('validate component', () => {
    expect(element.tagName).to.equal('DASHBOARD-GRID');
  });

  describe('handler & helper', () => {
    it('_checkIntegrity of object', () => {
      expect(element._checkIntegrity({})).to.be.false;
      expect(element._checkIntegrity({ 'details': 'foo', 'bar': 'foobar' })).to.be.true;
      expect(element._checkIntegrity(123)).to.be.false;
      expect(element._checkIntegrity('123')).to.be.false;
      expect(element._checkIntegrity('aze123&é"&é"&')).to.be.false;
      expect(element._checkIntegrity([0, 1, 1])).to.be.false;
    });

    it('_handleGeekJoke || expect error', () => {
      expect(() => element._handleGeekJoke()).to.throw(Error);
    });

    it('_handleGeekJoke || 200 success', () => {
      element._handleGeekJoke(MockDataMixin.getMockDataGeekJoke);
      expect(element.randomGeekJoke).to.equal(MockDataMixin.getMockDataGeekJoke);
    });
  });
});

describe('services', async () => {
  let server;
  const headers = { 'Content-type': 'application/json' };

  beforeEach(() => {
    server = fakeServer.create();
    server.respondImmediately = true;
  });

  afterEach(() => {
    server.restore();
  });

  it('getNewsFeedByQuestion || 200 success', async () => {
    const response = MockDataMixin.getMockDataNewsFeedByQuestion();

    server.respondWith(/\/api\/v1\/news/, JSON.stringify(response));
    const testData = await services.getNewsFeedByQuestion('nasa');

    expect(testData).to.be.an('Object');
    expect(testData).to.not.be.empty;
    expect(testData).to.eql(response);
  });

  it('getNewsFeedByQuestion || 500 error', async () => {
    const response = MockDataMixin.getMockDataNewsFeedByQuestion();

    server.respondWith(/\/api\/v1\/news/, [500, headers, JSON.stringify(response)]);
    await services.getNewsFeedByQuestion('nasa').catch((e) => {
      expect(e).to.be.an('Error');
      expect(e.message).to.contain('Unable to get news feed');
    });
  });

  it('getRandomMathFunFact || 200 success', async () => {
    const response = MockDataMixin.getMockDataMathFunFact();

    server.respondWith(/\/api\/v1\/fact/, JSON.stringify(response));
    const testData = await services.getRandomMathFunFact();

    expect(testData).to.be.a('String');
    expect(testData).to.not.be.empty;
    expect(testData).to.eql(response);
  });

  it('getGeekJoke || 200 success', async () => {
    const response = MockDataMixin.getMockDataGeekJoke();

    server.respondWith(/\/api\/v1\/joke/, JSON.stringify(response));
    const testData = await services.getGeekJoke();

    expect(testData).to.be.a('String');
    expect(testData).to.not.be.empty;
    expect(testData).to.eql(response);
  });

  it('getEarthWeather || 200 success', async () => {
    const response = MockDataMixin.getMockDataEarthWeather();

    server.respondWith(/\/api\/v1\/weather/, JSON.stringify(response));
    const testData = await services.getEarthWeather();

    expect(testData).to.be.a('Object');
    expect(testData).to.not.be.empty;
    expect(testData).to.eql(response);
  });

  it('getMarsWeather || 200 success', async () => {
    const response = MockDataMixin.getMockDataMarsWeather();

    server.respondWith(/\/api\/v1\/nasa/, JSON.stringify(response));
    const testData = await services.getMarsWeather();

    expect(testData).to.be.a('Object');
    expect(testData).to.not.be.empty;
    expect(testData).to.eql(response);
  });

  it('getTimetracker || 200 success', async () => {
    const response = MockDataMixin.getMockDataTimeTracker();

    server.respondWith(/\/api\/v1\/timetracker/, JSON.stringify(response));
    const testData = await services.getTimetracker();

    expect(testData).to.be.a('Array');
    expect(testData).to.not.be.empty;
    expect(testData).to.eql(response);
  });
});