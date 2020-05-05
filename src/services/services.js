import fetcher from './service-fetcher.js';
import { ajax } from '@lion/ajax';
const PREFIX = '/api/v1/'

// /**
//  * Get news feed by added question
//  * @param question word containing the subject e.g.: nasa
//  * @returns {Promise<Object[]>}
//  */
// async function getNewsFeedByQuestion(question) {
//   try {
//     const response = await fetcher.get(`${PREFIX}news/${question}`);
//     return response;
//   } catch (e) {
//     throw new Error(`Unable to get news feed: ${e.message}`);
//   }
// }

/**
 * Get news feed by added question
 * @param question word containing the subject e.g.: nasa
 * @returns {Promise<Object[]>}
 */
async function getNewsFeedByQuestion(question) {
  try {
    const response = await ajax.get(`${PREFIX}news/${question}`);
    return response.data;
  } catch (e) {
    throw new Error(`Unable to get news feed: ${e.message}`);
  }
}

/**
 * Get a random math fun fact
 * @returns {Promise<Object[]>}
 */
async function getRandomMathFunFact() {
  try {
    const response = await ajax.get(`${PREFIX}fact/`);
    return response.data;
  } catch (e) {
    throw new Error(`Unable to fun math fact: ${e.message}`);
  }
}

/**
 * Get a random geek joke
 * @returns {Promise<Object[]>}
 */
async function getGeekJoke() {
  try {
    const response = await ajax.get(`${PREFIX}joke/`);
    return response.data;
  } catch (e) {
    throw new Error(`Unable to get geek joke: ${e.message}`);
  }
}

/**
 * Get the current weather in Leuven
 * @returns {Promise<Object[]>}
 */
async function getEarthWeather() {
  try {
    const response = await ajax.get(`${PREFIX}weather/`);
    return response.data;
  } catch (e) {
    throw new Error(`Unable to get weather on Earth: ${e.message}`);
  }
}

/**
 * Get the current weather on Mars
 * @returns {Promise<Object[]>}
 */
async function getMarsWeather() {
  try {
    const response = await ajax.get(`${PREFIX}nasa/`);    
    return response.data;
  } catch (e) {
    throw new Error(`Unable to get weather on Mars: ${e.message}`);
  }
}

/**
 * Gets all timetracks
 * @returns {Promise<Object[]>}
 */
async function getTimetracker() {
  try {
    const response = await ajax.get(`${PREFIX}timetracker/`);
    return response.data;
  } catch (e) {
    throw new Error(`Unable to get timetracker data: ${e.message}`);
  }
}

/**
 * Posts given timetrack
 * @returns {Promise<Object[]>}
 */
async function postTimetracker(givenData) {
  const data = {
    ...givenData,
    duration: 1000,
    date: new Date(),
    tag: null,
  }
  
  // TODO: add other inputs

  try {
    const response = await ajax.post(`${PREFIX}timetracker/`, data);
    return response.data;
  } catch (e) {
    throw new Error(`Unable to post: ${e.message}`);
  }
}

/**
 * Patches given timetrack entry with new state
 * @returns {Promise<Object[]>}
*/
async function patchTimetrackerEntry(state, id) {
  try {
    const obj = {
      state: state ? 1 : 0,
    };
    const response = await ajax.patch(`${PREFIX}timetracker/${id}`, obj);
    return response;
  } catch (e) {
    throw new Error(`Unable to patch: ${e.message}`)
  }
}

/**
 * Deletes timetrack entry by id
 * @returns {Promise<Object[]>}
*/
async function deleteTimetrackById(id) {
  try {
    const response = await ajax.delete(`${PREFIX}timetracker/${id}`);
  } catch (e) {
    throw new Error(`Unable to delete: ${e.message}`)
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
  patchTimetrackerEntry,
  deleteTimetrackById,
}
