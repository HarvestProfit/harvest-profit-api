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
export default class WebApi {
  constructor() {
    this.baseUrl = process.env.API_URL || 'http://localhost:3000/api/v3';
    this.interceptor = this._setInteceptor();
  }

  /**
   * Performs a delete request on the specified Url with optional parameters
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   */
  _delete(url, params = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.delete(apiUrl, {
      params,
    });
  }

  /**
   * Performs an authenticated delete request on the specified Url with optional
   * parameters
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
   */
  _get(url, params = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.get(apiUrl, {
      params,
    });
  }

  /**
   * Performs an authenticated get request on the specified Url with optional
   * parameters
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
   * Performs a post request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   */
  _post(url, data = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.post(apiUrl, data);
  }

  /**
   * Performs an authenticated post request on the specified Url with optional
   * parameters
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
   * Performs a put request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   */
  _put(url, data = {}) {
    const apiUrl = this.baseUrl + url;
    return axios.put(apiUrl, data);
  }

  /**
   * Performs an authenticated put request on the specified Url with optional
   * parameters
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
   * Setup interceptor to refresh tokens if necessary. Only useful for
   * authenticated API requests.
   */
  _setInteceptor() {
    axios.interceptors.response.use(response => response, (error) => {
      const original = error ? error.config : { url: '' };
      let responseCode = 0;
      if (error && error.response) {
        responseCode = error.response.status;
      } else if (error && error.status) {
        responseCode = error.status;
      }

      if (original.url.indexOf('refresh') === -1 && !original.harvest_retried && responseCode === 403) {
        original.harvest_retried = true;
        return new Promise((resolve, reject) => {
          this._getAuthenticated('/refresh').then((response) => {
            console.log('Successfully refreshed token'); // eslint-disable-line no-console
            original.headers.Authorization = response.data.auth_token;
            return resolve(axios(original));
          }).catch((exception) => {
            routerActions.push('/login');
            return reject(exception);
          });
        });
      }
      if (process.env.RAILS_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
        Raven.captureException(error);
      } else if (process.env.NODE_ENV !== 'test') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      return Promise.reject(error);
    });
  }

  /**
   * Thin wrapper for the [_get]{@link Api#_delete} method.
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static delete(url, params = {}) {
    const api = new WebApi();
    return api._delete(url, params);
  }

  /**
   * Thin wrapper for the [_deleteAuthenticated]{@link Api#_deleteAuthenticated}
   * method.
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static deleteAuthenticated(url, params = {}) {
    const api = new WebApi();
    return api._deleteAuthenticated(url, params);
  }

  /**
   * Thin wrapper for the [_get]{@link Api#_get} method.
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static get(url, params = {}) {
    const api = new WebApi();
    return api._get(url, params);
  }

  /**
   * Thin wrapper for the [_getAuthenticated]{@link Api#_getAuthenticated}
   * method.
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static getAuthenticated(url, params = {}) {
    const api = new WebApi();
    return api._getAuthenticated(url, params);
  }

  /**
   * Thin wrapper for the [_post]{@link Api#_post} method.
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static post(url, data = {}) {
    const api = new WebApi();
    return api._post(url, data);
  }

  /**
   * Thin wrapper for the [_postAuthenticated]{@link Api#_postAuthenticated}
   * method.
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static postAuthenticated(url, data = {}) {
    const api = new WebApi();
    return api._postAuthenticated(url, data);
  }

  /**
   * Thin wrapper for the [_put]{@link Api#_put} method.
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static put(url, data = {}) {
    const api = new WebApi();
    return api._put(url, data);
  }

  /**
   * Thin wrapper for the [_putAuthenticated]{@link Api#_putAuthenticated}
   * method.
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static putAuthenticated(url, data = {}) {
    const api = new WebApi();
    return api._putAuthenticated(url, data);
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

  /**
   * This function fetches stuff.
   * @param {number} perPage How many records are there per page
   * @param {number} totalCount How many records are in there to retrieve
   * @param {number} startingPage Page to start at
   * @param {Function} fetchFunction The function to use. Funky.
   */
  static fetchOtherPages(perPage, totalCount, startingPage, fetchFunction) {
    const divisor = Math.ceil(totalCount / perPage);
    for (let i = startingPage; i < divisor + 1; i += 1) {
      fetchFunction(i);
    }
  }
}
