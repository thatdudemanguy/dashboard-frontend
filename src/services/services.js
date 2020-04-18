import fetcher from './service-fetcher.js';
const PREFIX = 'api/v1/'

/**
 * Get news feed by added question
 * @param question word containing the subject e.g.: nasa
 * @returns {Promise<Object[]>}
 */
async function getNewsFeedByQuestion(question) {
  try {
    const response = await fetcher.get(`${PREFIX}news/${question}`);
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
    const response = await fetcher.get(`${PREFIX}fact/`);
    return response.text();
  } catch (error) {
    throw new Error(`Unable to fun math fact: ${error.message}`);
  }
}

/**
 * Get a random geek joke
 * @returns {Promise<Object[]>}
 */
async function getGeekJoke() {
  try {
    const response = await fetcher.get(`${PREFIX}joke/`);
    return response.json();
  } catch (error) {
    throw new Error(`Unable to get geek joke: ${error.message}`);
  }
}

/**
 * Get the current weather in Leuven
 * @returns {Promise<Object[]>}
 */
async function getEarthWeather() {
  try {
    const response = await fetcher.get(`${PREFIX}weather/`);
    return response.json();
  } catch (error) {
    throw new Error(`Unable to get weather on Earth: ${error.message}`);
  }
}

/**
 * Get the current weather on Mars
 * @returns {Promise<Object[]>}
 */
async function getMarsWeather() {
  try {
    const response = await fetcher.get(`${PREFIX}nasa/`);
    return response.json();
  } catch (error) {
    throw new Error(`Unable to get weather on Mars: ${error.message}`);
  }
}

/**
 * Gets all timetracks
 * @returns {Promise<Object[]>}
 */
async function getTimetracker() {
  try {
    const response = await fetcher.get(`${PREFIX}timetracker/`);
    return response.json();
  } catch (error) {
    throw new Error(`Unable to get timetracker data: ${error.message}`);
  }
}

/**
 * Posts given timetrack
 * @returns {Promise<Object[]>}
 */
async function postTimetracker(givenData) {
  const data = {
    ...givenData,
    state: 1,
    duration: 1000,
    date: new Date(),
    tag: null,
  }
  
  // TODO: add other inputs

  try {
    const response = await fetcher.post(`${PREFIX}timetracker/`, data);

    console.log(response);
    return response;
  } catch (error) {
    throw new Error(`Unable to post: ${error.message}`);
  }
}



export default {
  getNewsFeedByQuestion,
  getRandomMathFunFact,
  getGeekJoke,
  getEarthWeather,
  getMarsWeather,
  getTimetracker,
  postTimetracker,
}
