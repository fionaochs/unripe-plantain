const Studio = require('../lib/models/Studio');
const chance = require('chance').Chance();

module.exports = async({ studiosToCreate = 10 } = {}) => {

  const studioOption = ['warnerBros', 'disney', 'pixar'];
  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.pickone(studioOption),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));
};
