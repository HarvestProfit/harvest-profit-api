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
      let response = WebApi.get('/potato', {
        baked: 'a little',
        salted: 'lighly'
      });
      moxios.wait(function () {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: [
            { id: 1, firstName: 'potato', eaten: false },
            { id: 2, firstName: 'patota', eaten: true }
          ]
        })
      });
      expect(response).toEqual(200);
    });
  });
});
describe('tests', () => {
    it('it should run this test', () => {
      expect(1).toEqual(1);
    });
  });
