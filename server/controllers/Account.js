const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/portals' });
  });
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/portals' });
    });

    savePromise.catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already taken.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

const changePassword = (req, res) => {
  const oldpass = `${req.body.oldpass}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!oldpass || !pass || !pass2) {
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  const id = req.session.account._id;

  return Account.AccountModel.checkPassword(id, oldpass, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    if (!doc) {
      return res.status(401).json({ error: 'The old password is incorrect' });
    }

    return Account.AccountModel.generateHash(pass, (salt, hash) =>
      Account.AccountModel.findByIdAndUpdate(
        id,
        { $set: { salt, password: hash } },
        { new: true }, (err2) => {
          if (err2) {
            console.log(err2);
            return res.status(400).json({ error: 'An error occurred' });
          }

          return res.status(200).json({ message: 'Password changed successfully :)' });
        }));
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

const getAccountType = (request, response) => {
  const id = request.session.account._id;
  return Account.AccountModel.findById(id, (err, doc) => {
    if (err) {
      console.log(err);
      return response.status(400).json({ error: 'An error occurred' });
    }

    return response.status(200).json({ accountType: doc.accountType });
  });
};

const updateAccountType = (request, response) => {
  console.log(request);
  console.log(response);
};

module.exports = {
  loginPage,
  logout,
  signup,
  login,
  getToken,
  changePassword,
  getAccountType,
  updateAccountType,
};
