const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let PortalModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const PortalSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  titles: {
    type: [String],
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  blurb: {
    type: String,
  },
  color: {
    type: String,
    default: '#A8444D',
  },
});

// DomoSchema.statics.toAPI = (doc) => ({
//   name: doc.name,
//   age: doc.age,
// });
//

PortalSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return PortalModel.find(search).select('_id label titles skills').exec(callback);
};

PortalModel = mongoose.model('Portal', PortalSchema);

module.exports.PortalModel = PortalModel;
module.exports.PortalSchema = PortalSchema;
