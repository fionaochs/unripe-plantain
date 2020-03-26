const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, reviewersToCreate = 10 } = {}) => {

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
};
