const models = require('../models');
const Portal = models.Portal;

const portalPage = (req, res) => res.render('app', { csrfToken: req.csrfToken() });

const createPortal = (req, res) => {
  const { label, titles, skills, color } = req.body;

  if (!label || !titles || !skills || titles.length < 1 || skills.length < 1 || !color) {
    return res.status(400).json({ error: 'The label, titles, and skills are required' });
  }

  const portalData = { label, titles, skills, color, owner: req.session.account._id };

  const newPortal = new Portal.PortalModel(portalData);
  const promise = newPortal.save();

  promise.then(() => res.status(200).json({ message: 'Portal successfully created :)' }));

  promise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Portal already exists' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  });

  return promise;
};

const getPortals = (req, res) => {
  const request = req;
  const response = res;

  return Portal.PortalModel.findByOwner(request.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return response.status(400).json({ error: 'An error occurred' });
    }

    return response.json({ portals: docs });
  });
};

module.exports = {
  portalPage,
  createPortal,
  getPortals,
};
