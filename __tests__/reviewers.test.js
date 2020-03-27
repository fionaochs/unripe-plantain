const { getReviewer, getReviewers, getReviews } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'test reviewer',
        company: 'review company',        
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          company: expect.any(String),          
          __v: 0
        });
      });
  });

  it('gets a reviewer by id', async() => {
    const reviewer = await getReviewer();
    const reviews = await getReviews({ reviewerId: reviewer._id });

    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          reviews: expect.arrayContaining(reviews)
        });
      });
  });

  it('gets all reviewers', async() => {
    const reviewers = await getReviewers();
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(reviewers);
      });
  });

  it('updates a reviewer by id', async() => {
    const reviewer = await getReviewer();
    return request(app)
      .patch(`/api/v1/reviewers/${reviewer._id}`)
      .send({ company: 'new company' })
      .then(res => {
        expect(res.body).toEqual({
          ...reviewer,
          company: 'new company'
        });
      });
  });
});
