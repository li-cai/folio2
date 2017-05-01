const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/portals', mid.requiresLogin, controllers.Portal.portalPage);
  app.get('/getPortals', mid.requiresLogin, controllers.Portal.getPortals);
  app.post('/portal', mid.requiresLogin, controllers.Portal.createPortal);
  app.post('/changePassword', mid.requiresLogin, controllers.Account.changePassword);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  appp.get('/portal/:id', )
};

module.exports = router;
