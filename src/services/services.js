import { newsSource, mathFunFactSource } from './service-sources';
import fetcher from './service-fetcher.js';

/**
 * Get news feed by added question
 * @param question word containt the subject e.g.: nasa
 * @returns {Promise<Object[]>}
 */
async function getNewsFeedByQuestion(question) {
  try {
    const response = await fetcher.get(`${newsSource}?q=${question}&apiKey=eecb3622f7804addb79c2f2c3864e655`);
    return response.json();
  } catch (error) {
    throw new Error(`Unable to get news feed: ${error.message}`);
  }
}

/**
 * Get a random math fun fact
 * @returns {Promise<Object[]>}
 */
async function getRandomMathFunFact() {
  try {
    const response = await fetcher.get(mathFunFactSource);
    return response.text();
  } catch (error) {
    throw new Error(`Unable to get news feed: ${error.message}`);
  }
}

export default {
  getNewsFeedByQuestion,
  getRandomMathFunFact,
}
