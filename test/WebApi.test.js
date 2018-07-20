import WebApi from '../src/WebApi';
import moxios from 'moxios';

describe('Webapi', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
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
          status: WebApi.getAuthCookie() == 'harvestprofitauth' ? 202 : 250,
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
        expect(response.status).toEqual(250);
      })
    });

    it('it should make an authenticated post request', async () => {
      WebApi.setAuthCookie('harvestprofitauth');
      await WebApi.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
    });

    it('it should fail to make an authenticated post request', async () => {
      WebApi.setAuthCookie('wrongtoken');
      await WebApi.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(250);
      })
    });

    it('it should make an authenticated put request', async () => {
      WebApi.setAuthCookie('harvestprofitauth');
      await WebApi.putAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
    });

    it('it should fail to make an authenticated put request', async () => {
      WebApi.setAuthCookie('wrongtoken');
      await WebApi.putAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(250);
      })
    });

    it('it should make an authenticated delete request', async () => {
      WebApi.setAuthCookie('harvestprofitauth');
      await WebApi.deleteAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(202);
      })
    });

    it('it should fail to make an authenticated delete request', async () => {
      WebApi.setAuthCookie('wrongtoken');
      await WebApi.deleteAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.status).toEqual(250);
      })
    });
  });
});


/*

  describe('Post Api requests', () => {












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
        expect(response.status).toEqual(200);
      })
    });

    it('it should fail to make an authenticated get request', () => {
      WebApi.setAuthCookie('notrighttoken');
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

    it('it should fail to make an authenticated post request', async () => {
      WebApi.setAuthCookie('nottherighttoken');
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (response.request.headers.Authentication == 'djgf;lgf;') {
        request.respondWith({
          status: 402,
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
      await WebApi.postAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        //console.log(response);
        expect(response.status).toEqual(401);
      });
    });
  });

  describe('Put Api requests', () => {
    it('it should make a put request', () => {
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 202,
          response: [
            { id: 1, item: 'Harvest-item2' }
          ]
        })
      });
      WebApi.put('/update', params)
      .then(function (response) {
        expect(response.data.status).toEqual(202);
      });
    })

    it('it should make an authenticated put request', () => {
      WebApi.setAuthCookie('harvestprofitauth');
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 202,
          response: [
            { id: 1, item: 'Harvest-item2' }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.putAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(202);
      })
    });

    it('it should fail to make an authenticated put request', () => {
      WebApi.setAuthCookie('harvestprofitauth');
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 202,
          response: [
            { id: 1, item: 'Harvest-item2' }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.putAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(401);
      })
    });
  });

  describe('Delete Api requests', () => {
    it('it should make a delete request', () => {
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: [
            { id: 1, item: 'Harvest-item2' }
          ]
        })
      });
      WebApi.delete('/delete', params)
      .then(function (response) {
        expect(response.data.status).toEqual(200);
      });
    })

    it('it should make an authenticated delete request', () => {
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
            { id: 1, item: 'Harvest-item2' }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.deleteAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(200);
      })
    });

    it('it should fail to make an authenticated delete request', () => {
      WebApi.setAuthCookie('harvestprofitauth');
      let params = {
        name: 'Harvest',
        email: 'harvest@harvestprofit.com'
      };
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        if (request.headers.Authentication == 'harvestprofitauth') {
        request.respondWith({
          status: 202,
          response: [
            { id: 1, item: 'Harvest-item2' }
          ]
        })
      } else {
        request.respondWith({
          status: 401
        })
      }
      });
      WebApi.deleteAuthenticated('/secureEndpoint', params)
      .then(function (response) {
        expect(response.data.status).toEqual(401);
      })
    });
  });
*/
