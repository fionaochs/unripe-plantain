const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: [{
    role: {
      type: String
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

schema.statics.topRated = function(count = 100) {
  return this
    .model('Review')
    .aggregate([
      {
        '$group': {
          '_id': '$film', 
          'avgRating': {
            '$avg': '$rating'
          }
        }
      }, {
        '$sort': {
          'avgRating': -1
        }
      }, {
        '$limit': count
      }, {
        '$lookup': {
          'from': 'films', 
          'localField': '_id', 
          'foreignField': '_id', 
          'as': 'film'
        }
      }, {
        '$unwind': {
          'path': '$film'
        }
      }, {
        '$project': {
          'avgRating': true, 
          'name': '$film.title'
        }
      }
    ]);
};
module.exports = mongoose.model('Film', schema);

