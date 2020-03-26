const { getFilm, getFilms, getStudio, getActor } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('creates a film', () => {
    const studio = getStudio();
    const actor = getActor();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'test film',
        studioId: studio._id,
        released: '1985',
        cast: {
          role: 'water boy',
          actorId: actor._id
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'test film',
          studioId: studio._id,
          released: '1985',
          cast: {
            role: 'water boy',
            actorId: actor._id
          },
          __v: 0
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
      });
  });

  it('gets all studios', async() => {
    const studios = await getStudios();
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(studios);
      });
  });
});