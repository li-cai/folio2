const models = require('../models');
const Portal = models.Portal;
const Folio = models.Folio;

const folioPage = (req, res) => res.render('folio', { csrfToken: req.csrfToken() });

const getPortal = (req, res) => Portal.PortalModel.findById(req.params.id, (err, doc) => {
  if (err) {
    return res.status(400).json({ error: 'An error occurred' });
  }
  return res.status(200).json({ portal: doc });
});

const getFolios = (req, res) =>
Folio.FolioModel.findByPortalId(req.params.portalId, (err, docs) => {
  if (err) {
    return res.status(400).json({ error: 'An error occurred' });
  }
  return res.status(200).json({ folios: docs });
});

const createFolio = (req, res) => {
  const { name, title, skills, email, portfolio, portalId } = req.body;

  if (!name || !title || !skills || !email || !portfolio) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newFolio = new Folio.FolioModel({ name, title, skills, email, portfolio, portalId });
  const promise = newFolio.save();

  promise.then(() => res.status(200).json({ message: 'Folio successfully created :)' }));

  promise.catch((err) => {
    console.log(err);

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Folio already exists' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  });

  return promise;
};

module.exports = {
  folioPage,
  getPortal,
  getFolios,
  createFolio,
};
