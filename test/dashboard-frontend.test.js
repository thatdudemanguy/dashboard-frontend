import { html, fixture, expect } from '@open-wc/testing';
import '../src/dashboard-frontend.js';

describe('DashboardFrontend', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <dashboard-frontend></dashboard-frontend>
    `);
  });
});