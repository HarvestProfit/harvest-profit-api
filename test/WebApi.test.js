import WebApi from '../src/WebApi';
import moxios from 'moxios';
import Cookie from 'js-cookie';

describe('Webapi', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    Cookie.remove('harvest_profit');
  });

  describe('Basic Api requests', () => {
    let params = {
      name: 'Harvest',
      email: 'harvest@harvestprofit.com'
    }
    beforeEach(() => {
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
        });
      });
    });

    it('it should make a get request', async () => {
      await WebApi.get('/endpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
    });

    it('it should make a post request', async () => {
      await WebApi.post('/create', params)
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
    })

    it('it should make a put request', async () => {
      await WebApi.put('/update', params)
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
    });

    it('it should make a delete request', async () => {
      await WebApi.delete('/delete', params)
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
    });
  });

  describe('Authenticated Api requests', () => {
    let params = {
      name: 'Harvest',
      email: 'harvest@harvestprofit.com'
    };
    beforeEach(() => {
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: WebApi.getAuthCookie() == 'harvestprofitauth' ? 202 : 401,
        });
      });
    });

    it('it should make an authenticated get request', async () => {
      WebApi.setAuthCookie('harvestprofitauth');
      await WebApi.getAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
    });

    it('it should fail to make an authenticated get request', async () => {
      WebApi.setAuthCookie('wrongtoken');
      await WebApi.getAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
      .catch(function (error) {
        expect(error.response.status).toEqual(401);
      });
    });

    it('it should make an authenticated post request', async () => {
      WebApi.setAuthCookie('harvestprofitauth');
      await WebApi.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      });
    });

    it('it should fail to make an authenticated post request', async () => {
      WebApi.setAuthCookie('wrongtoken');
      await WebApi.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
      .catch(function (error) {
        expect(error.response.status).toEqual(401);
      });
    });

    it('it should make an authenticated put request', async () => {
      WebApi.setAuthCookie('harvestprofitauth');
      await WebApi.putAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      });
    });

    it('it should fail to make an authenticated put request', async () => {
      WebApi.setAuthCookie('wrongtoken');
      await WebApi.putAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
      .catch(function (error) {
        expect(error.response.status).toEqual(401);
      });
    });

    it('it should make an authenticated delete request', async () => {
      WebApi.setAuthCookie('harvestprofitauth');
      await WebApi.deleteAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      });
    });

    it('it should fail to make an authenticated delete request', async () => {
      WebApi.setAuthCookie('wrongtoken');
      await WebApi.deleteAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
      .catch(function (error) {
        expect(error.response.status).toEqual(401);
      });
    });
  });

  describe('Interceptor tests', () => {

  });

  describe('Test cookie', () => {

    it('it should default return undefined', () => {
      expect(WebApi.getAuthCookie()).toEqual('undefined');
    });

    it('it should return the cookie value', () => {
      WebApi.setAuthCookie('Harvest');
      expect(WebApi.getAuthCookie()).toEqual('Harvest');
    });
  });
});
