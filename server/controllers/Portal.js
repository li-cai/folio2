const models = require('../models');
const Portal = models.Portal;
const url = require('url');

const portalPage = (req, res) => {
  Portal.PortalModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { portals: docs, csrfToken: req.csrfToken() });
  });
};

module.exports = {
	portalPage,
};
