import WebApi from '../src/WebApi';
import moxios from 'moxios';

describe('Webapi', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('Api requests', () => {
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
      let headers = {
        Authorization: WebApi.getAuthCookie()
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 200,
          response: [
            { id: 1, item: 'potato', cooked: false },
            { id: 2, item: 'carrot', cooked: true }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.get('/secureEndpoint', params, headers)
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
      let headers = {
        Authorization: 'notrighttoken'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 200,
          response: [
            { id: 1, item: 'potato', cooked: false },
            { id: 2, item: 'carrot', cooked: true }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.get('/secureEndpoint', params, headers)
      .then(function (response) {
        expect(response.data.status).toEqual(401);
      })
    });

    
  });
});
