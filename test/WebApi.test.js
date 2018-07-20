import WebApi from '../src/WebApi';
import moxios from 'moxios';

describe('Webapi', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Get Api requests', () => {
    it('it should make a get request', () => {
      //make a request here
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      }
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: [
            { id: 1, item: 'Harvest-item1' },
            { id: 2, item: 'Harvest-item2' }
          ]
        })
      });
      WebApi.get('/endpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(200);
      });
    });

    it('it should make an authenticated get request', () => {
      WebApi.setAuthCookie('harvestprofitauth');
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 200,
          response: [
            { id: 1, item: 'Harvest-item1' },
            { id: 2, item: 'Harvest-item2' }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.getAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(200);
      })
    });

    it('it should fail to make an authenticated get request', () => {
      WebApi.setAuthCookie('harvestprofitauth');
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 200,
          response: [
            { id: 1, item: 'Harvest-item1' },
            { id: 2, item: 'Harvest-item2' }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.getAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(401);
      })
    });
  });

  describe('Post Api requests', () => {
    it('it should make a post request', () => {
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 201,
          response: [
            { id: 1, item: 'Harvest-item1' }
          ]
        })
      });
      WebApi.post('/create', params)
      .then(function (response) {
        expect(response.data.status).toEqual(401);
      });
    })

    it('it should make an authenticated post request', () => {
      WebApi.setAuthCookie('harvestprofitauth');
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 201,
          response: [
            { id: 1, item: 'Harvest-item1' }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(201);
      })
    });

    it('it should fail to make an authenticated post request', () => {
      WebApi.setAuthCookie('harvestprofitauth');
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 200,
          response: [
            { id: 1, item: 'Harvest-item1' }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(401);
      })
    });
  });
});
