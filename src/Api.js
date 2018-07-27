import axios from 'axios';
import Cookie from 'js-cookie';
import ApiCore from '@harvest-profit/api-core';
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
  constructor() {
    this.baseUrl = process.env.API_URL || 'http://localhost:3000/api/v3';
  }

  /**
   * Performs a get request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static get(url, params = {}) {
    const api = new ApiCore(this.baseUrl, this.getAuthCookie());
    return api.get(url, params);
  }

  /**
   * Performs an authenticated get request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static getAuthenticated(url, params = {}) {
    const api = new ApiCore(this.baseUrl, this.getAuthCookie());
    return api.getAuthenticated(url, params);
  }

  /**
   * Performs a post request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static post(url, data = {}) {
    const api = new ApiCore(this.baseUrl, this.getAuthCookie());
    return api.post(url, data);
  }

  /**
   * Performs an authenticated post request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static postAuthenticated(url, data = {}) {
    const api = new ApiCore(this.baseUrl, this.getAuthCookie());
    return api.postAuthenticated(url, data);
  }

  /**
   * Performs a put request on the specified Url with optional parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static put(url, data = {}) {
    const api = new ApiCore(this.baseUrl, this.getAuthCookie());
    return api.put(url, data);
  }

  /**
   * Performs an authenticated put request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a request to
   * @param {object} data The data to post
   * @return {object}
   */
  static putAuthenticated(url, data = {}) {
    const api = new ApiCore(this.baseUrl, this.getAuthCookie());
    return api.putAuthenticated(url, data);
  }

  /**
   * Performs a delete request on the specified Url with optional parameters
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static delete(url, params = {}) {
    const api = new ApiCore(this.baseUrl, this.getAuthCookie());
    return api.delete(url, params);
  }

  /**
   * Performs an authenticated delete request on the specified Url with optional
   * parameters
   * @param {string} url The url to make a delete request to
   * @param {object} params The params to add to the url
   * @return {object}
   */
  static deleteAuthenticated(url, params = {}) {
    const api = new ApiCore(this.baseUrl, this.getAuthCookie());
    return api.deleteAuthenticated(url, params);
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
