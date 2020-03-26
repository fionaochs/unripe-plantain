const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 10, actorsToCreate = 10 } = {}) => {

  const studioOption = ['warnerBros', 'disney', 'pixar'];
  const actorOption = ['Heath Ledger', 'Will Smith', 'Robin Williams'];

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
};
