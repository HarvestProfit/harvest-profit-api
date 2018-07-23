import axios from 'axios';
import Cookie from 'js-cookie';
import { routerActions } from 'react-router-redux';
// Import Raven from outside webpack
// eslint-disable-next-line
import Raven from 'raven-js';
import Api from './Api';
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
class WebApi {
  constructor() {
    this.baseUrl = process.env.API_URL || 'http://localhost:3000/api/v3';
    this.interceptor = this._setInteceptor();
  }

  /**
   * Setup interceptor to refresh tokens if necessary. Only useful for
   * authenticated API requests.
   * @private
   */
  _setInteceptor() {
    axios.interceptors.response.use(response => response, (error) => {
      const original = error ? error.config : { url: '' };
      let responseCode = 0;
      if (error && error.response) {
        responseCode = error.response.status;
      }

      if (original && original.url.indexOf('refresh') === -1 && !original.harvest_retried && responseCode === 403) {
        original.harvest_retried = true;
        return new Promise((resolve, reject) => {
          this._getAuthenticated('/refresh').then((response) => {
            original.headers.Authorization = response.data.auth_token;
            return resolve(axios(original));
          }).catch((exception) => {
            return reject(exception);
          });
        });
      }
      return Promise.reject(error);
    });
  }

  /**
   * Performs an authenticated get request on the specified Url with optional
   * parameters
   * @private
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   */
  _getAuthenticated(url, params = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.get(apiUrl, {
      params,
      headers: {
        Authorization: WebApi.getAuthCookie(),
      },
    });
  }

  /**
   * Performs an authenticated post request on the specified Url with optional
   * parameters
   * @private
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   */
  _postAuthenticated(url, data = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.post(apiUrl, data, {
      headers: {
        Authorization: WebApi.getAuthCookie(),
      },
    });
  }

  /**
   * Performs an authenticated put request on the specified Url with optional
   * parameters
   * @private
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   */
  _putAuthenticated(url, data = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.put(apiUrl, data, {
      headers: {
        Authorization: WebApi.getAuthCookie(),
      },
    });
  }

  /**
   * Performs an authenticated delete request on the specified Url with optional
   * parameters
   * @private
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   */
  _deleteAuthenticated(url, params = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.delete(apiUrl, {
      params,
      headers: {
        Authorization: WebApi.getAuthCookie(),
      },
    });
  }

  /**
   * Performs a get request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static get(url, params = {}) {
    const api = new Api();
    return api._get(url, params);
  }

  /**
   * Performs an authenticated get request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static getAuthenticated(url, params = {}) {
    const api = new WebApi();
    return api._getAuthenticated(url, params);
  }

  /**
   * Performs a post request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static post(url, data = {}) {
    const api = new Api();
    return api._post(url, data);
  }

  /**
   * Performs an authenticated post request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static postAuthenticated(url, data = {}) {
    const api = new WebApi();
    return api._postAuthenticated(url, data);
  }

  /**
   * Performs a put request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static put(url, data = {}) {
    const api = new Api();
    return api._put(url, data);
  }

  /**
   * Performs an authenticated put request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static putAuthenticated(url, data = {}) {
    const api = new WebApi();
    return api._putAuthenticated(url, data);
  }

  /**
   * Performs a delete request on the specified Url with optional parameters
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static delete(url, params = {}) {
    const api = new Api();
    return api._delete(url, params);
  }

  /**
   * Performs an authenticated delete request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static deleteAuthenticated(url, params = {}) {
    const api = new WebApi();
    return api._deleteAuthenticated(url, params);
  }

  /**
   * Get the Authenication JWT. Returns `false` if the cookie is not available.
   * @return {string|boolean}
   */
  static getAuthCookie() {
    const cookie = Cookie.get('harvest_profit');
    if (typeof cookie === 'undefined') {
      return 'undefined';
    }
    return cookie;
  }

  /**
   * Set the Authenication JWT as a Cookie
   * @param {string} value The value to be set
   */
  static setAuthCookie(value) {
    Cookie.set('harvest_profit', value, {
      secure: location.protocol === 'https:', // eslint-disable-line
      expires: 7,
    });
  }
}

export default WebApi;
