const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, reviewersToCreate = 10, filmsToCreate = 10 } = {}) => {

  const studioOption = ['WarnerBros', 'Disney', 'Pixar'];
  const actorOption = ['Heath Ledger', 'Will Smith', 'Robin Williams'];
  const reviewerOption = ['Nike', 'Adidas', 'Whole Foods'];

  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.pickone(studioOption),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));
  
  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.pickone(actorOption),
    dob: chance.date(),
    pob: chance.city()
  })));

  const reviewer = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: `${chance.pickone(reviewerOption)} ${chance.animal()}`,
  })));

  const film = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: `${chance.animal()} ${chance.province()}`,
    studioId: chance.pickone(studios)._id,
    released: chance.year(),
    cast: [{
      role: chance.profession(),
      actorId: chance.pickone(actors)._id
    }]
  })));
};
