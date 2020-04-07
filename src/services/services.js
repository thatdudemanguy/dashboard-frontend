import { newsSource } from './service-sources';
import fetcher from './service-fetcher.js';

/**
 * Get news feed by added question
 * @param question word containt the subject e.g.: nasa
 * @returns {Promise<Object[]>}
 */
async function getNewsFeedByQuestion(question) {
  try {
    return await fetcher.get(`${newsSource}?q=${question}&apiKey=eecb3622f7804addb79c2f2c3864e655`);
  } catch (error) {
    throw new Error(`Unable to get news feed: ${error.message}`);
  }
}

export default {
  getNewsFeedByQuestion,
}
