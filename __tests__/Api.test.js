import Api from '../src/Api';
import moxios from 'moxios';
import Cookie from 'js-cookie';

describe('Api', () => {
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
      await Api.get('/endpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
    });

    it('it should make a post request', async () => {
      await Api.post('/create', params)
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
    })

    it('it should make a put request', async () => {
      await Api.put('/update', params)
      .then(function (response) {
        expect(response.status).toEqual(200);
      });
    });

    it('it should make a delete request', async () => {
      await Api.delete('/delete', params)
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
          status: Api.getAuthCookie() == 'harvestprofitauth' ? 202 : 401,
        });
      });
    });

    it('it should make an authenticated get request', async () => {
      Api.setAuthCookie('harvestprofitauth');
      await Api.getAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
    });

    it('it should fail to make an authenticated get request', async () => {
      Api.setAuthCookie('wrongtoken');
      await Api.getAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
      .catch(function (error) {
        expect(error.response.status).toEqual(401);
      });
    });

    it('it should make an authenticated post request', async () => {
      Api.setAuthCookie('harvestprofitauth');
      await Api.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      });
    });

    it('it should fail to make an authenticated post request', async () => {
      Api.setAuthCookie('wrongtoken');
      await Api.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
      .catch(function (error) {
        expect(error.response.status).toEqual(401);
      });
    });

    it('it should make an authenticated put request', async () => {
      Api.setAuthCookie('harvestprofitauth');
      await Api.putAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      });
    });

    it('it should fail to make an authenticated put request', async () => {
      Api.setAuthCookie('wrongtoken');
      await Api.putAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
      .catch(function (error) {
        expect(error.response.status).toEqual(401);
      });
    });

    it('it should make an authenticated delete request', async () => {
      Api.setAuthCookie('harvestprofitauth');
      await Api.deleteAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      });
    });

    it('it should fail to make an authenticated delete request', async () => {
      Api.setAuthCookie('wrongtoken');
      await Api.deleteAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
      .catch(function (error) {
        expect(error.response.status).toEqual(401);
      });
    });
  });

  describe('Interceptor refresh test', () => {
    let api = new Api();
    let params = {
      name: 'Harvest',
      email: 'harvest@harvestprofit.com'
    };
    beforeEach(() => {
      moxios.wait(function () {
        let request = moxios.requests.at(0);
        request.respondWith({
          status: 403,
        });
        moxios.wait(function () {
          let request = moxios.requests.at(1);
          request.respondWith({
            status: 200,
            response: {
              auth_token: 'abc123',
            }
          });
          moxios.wait(function () {
            let request = moxios.requests.at(2);
            request.respondWith({
              status: 200,
              response: {
                value: true
              }
            });
          });
        });
      });
    });

    it('token should be refreshed', async () => {
      Api.setAuthCookie('wrongtoken');
      await Api.get('/anything', params)
      .then((response) => {
        expect(response.data.value).toEqual(true);
      })
    });
  });

  describe('Interceptor failed refresh test', () => {
    let api = new Api();
    let params = {
      name: 'Harvest',
      email: 'harvest@harvestprofit.com'
    };
    beforeEach(() => {
      moxios.wait(function () {
        let request = moxios.requests.at(0);
        request.respondWith({
          status: 403,
        });
        moxios.wait(function () {
          let request = moxios.requests.at(1);
          request.respondWith({
            status: 405,
          });
        });
      });
    });

    it('expired token', async () => {
      Api.setAuthCookie('wrongtoken');
      await Api.get('/anything', params)
      .then((response) => {
      })
      .catch((error) => {
        expect(error.response.status).toEqual(405);
      })
    });
  });

  describe('Test cookie', () => {

    it('it should default return undefined', () => {
      expect(Api.getAuthCookie()).toEqual('undefined');
    });

    it('it should return the cookie value', () => {
      Api.setAuthCookie('Harvest');
      expect(Api.getAuthCookie()).toEqual('Harvest');
    });
  });
});
