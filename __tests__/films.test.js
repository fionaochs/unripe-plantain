const { getFilm, getFilms, getStudio, getActor, getReviews } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('creates a film', async() => {
    const studio = await getStudio();
    const actor = await getActor();
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
          title: expect.any(String),
          studioId: expect.any(String),
          released: expect.any(Number),
          cast: [{
            _id: expect.any(String),
            role: expect.any(String),
            actorId: expect.any(String)
          }],
          __v: 0
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();
    const reviews = await getReviews({ film: film._id });

    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...film,
          reviews: expect.arrayContaining(reviews)
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(films);
      });
  });
});
