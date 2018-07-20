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
        reason: 'fun'
      }
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: [
            { id: 1, item: 'potato', cooked: false },
            { id: 2, item: 'carrot', cooked: true }
          ]
        })
      });
      WebApi.get('/endpoint', params)
      .then(function (response) {
        console.log(response);
        expect(response.data.status).toEqual(200);
      });
    });
  });
});
describe('tests', () => {
    it('it should run this test', () => {
      expect(1).toEqual(1);
    });
  });
