const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let FolioModel = {};

const setName = (name) => _.escape(name).trim();

const FolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  portfolio: {
    type: String,
    trim: true,
    required: true,
  },
  portalId: {
    type: String,
    required: true,
  },
});

FolioSchema.statics.findByPortalId = (portalId, callback) => {
  const search = {
    portalId: portalId,
  };
  return FolioModel.find(search).select('name title skills email portfolio').exec(callback);
};

FolioModel = mongoose.model('Folio', FolioSchema);

module.exports.FolioModel = FolioModel;
module.exports.FolioSchema = FolioSchema;
