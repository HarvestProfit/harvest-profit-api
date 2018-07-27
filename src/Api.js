import axios from 'axios';
import Cookie from 'js-cookie';
import ApiCore from '@harvest-profit/api-core';
export const PER_PAGE_COUNT = 25;

/**
 * api class is used to make apiCore requests to the main app server.
 * Re-Authentication is handled exclusively by api class.
 */
class Api {
  constructor() {
    this.baseUrl = process.env.apiCore_URL || 'http://localhost:3000/apiCore/v3';
  }

  /**
   * Performs a get request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static get(url, params = {}) {
    const api = new Api();
    const apiCore = new ApiCore(api.baseUrl, Api.getAuthCookie());
    return apiCore.get(url, params);
  }

  /**
   * Performs an authenticated get request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static getAuthenticated(url, params = {}) {
    const api = new Api();
    const apiCore = new ApiCore(api.baseUrl, Api.getAuthCookie());
    return apiCore.getAuthenticated(url, params);
  }

  /**
   * Performs a post request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static post(url, data = {}) {
    const api = new Api();
    const apiCore = new ApiCore(api.baseUrl, Api.getAuthCookie());
    return apiCore.post(url, data);
  }

  /**
   * Performs an authenticated post request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static postAuthenticated(url, data = {}) {
    const api = new Api();
    const apiCore = new ApiCore(api.baseUrl, Api.getAuthCookie());
    return apiCore.postAuthenticated(url, data);
  }

  /**
   * Performs a put request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static put(url, data = {}) {
    const api = new Api();
    const apiCore = new ApiCore(api.baseUrl, Api.getAuthCookie());
    return apiCore.put(url, data);
  }

  /**
   * Performs an authenticated put request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static putAuthenticated(url, data = {}) {
    const api = new Api();
    const apiCore = new ApiCore(api.baseUrl, Api.getAuthCookie());
    return apiCore.putAuthenticated(url, data);
  }

  /**
   * Performs a delete request on the specified Url with optional parameters
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static delete(url, params = {}) {
    const api = new Api();
    const apiCore = new ApiCore(api.baseUrl, Api.getAuthCookie());
    return apiCore.delete(url, params);
  }

  /**
   * Performs an authenticated delete request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static deleteAuthenticated(url, params = {}) {
    const api = new Api();
    const apiCore = new ApiCore(api.baseUrl, Api.getAuthCookie());
    return apiCore.deleteAuthenticated(url, params);
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

export default Api;
