const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'test actor',
        dob: '03-03-1223',
        pob: 'test place',
        
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          dob: expect.any(String),
          pob: expect.any(String),
          
          __v: 0
        });
      });
  });

  it('gets an actor by id', async() => {
    const actor = await getActor();
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        expect(res.body).toEqual(actors);
      });
  });
});
