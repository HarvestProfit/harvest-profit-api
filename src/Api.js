import axios from 'axios';
import Cookie from 'js-cookie';
import { routerActions } from 'react-router-redux';
// Import Raven from outside webpack
// eslint-disable-next-line
import Raven from 'raven-js';

export const PER_PAGE_COUNT = 25;

/*
eslint no-underscore-dangle: ["error", {
  "allow": [
  "_delete",
  "_deleteAuthenticated",
  "_get",
  "_getAuthenticated",
  "_post",
  "_postAuthenticated",
  "_put",
  "_putAuthenticated",
  "_setInteceptor"]
}]
*/

/**
 * This class is used to make API requests to the main app server.
 * Re-Authentication is handled exclusively by this class.
 */
class Api {
  /**
   * Performs a get request on the specified Url with optional parameters
   * @private
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   */
  _get(url, params = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.get(apiUrl, {
      params,
    });
  }

  /**
   * Performs a post request on the specified Url with optional parameters
   * @private
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   */
  _post(url, data = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.post(apiUrl, data);
  }

  /**
   * Performs a put request on the specified Url with optional parameters
   * @private
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   */
  _put(url, data = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.put(apiUrl, data);
  }

  /**
   * Performs a delete request on the specified Url with optional parameters
   * @private
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   */
  _delete(url, params = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.delete(apiUrl, {
      params,
    });
  }
}

export default Api;
