import ReactDOM from 'react-dom';
import React from 'react';

import Login from './login/Login.js';
import Signup from './login/Signup.js';
import App from './app/App.js';
import Folio from './folio/Folio.js';

const renderSignup = (csrf) => {
  const onLogin = () => {
    hideMessage('#errorMessage');
    renderLogin(csrf);
  };

  ReactDOM.render(
    <Signup csrf={csrf} onLogin={onLogin} />,
    document.querySelector('#content')
  );
};

const renderLogin = (csrf) => {
  const onSignUp = () => {
    hideMessage('#errorMessage');
    renderSignup(csrf);
  };

  ReactDOM.render(
    <Login csrf={csrf} onSignUp={onSignUp} />,
    document.querySelector('#content')
  );
};

const setup = (csrf) => {
  renderLogin(csrf);
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
    const pathname = document.location.pathname;
    if (pathname === '/portals') {
      loadPortals(result.csrfToken);
    } else if (pathname === '/') {
      setup(result.csrfToken);
    } else {
      loadFolio(result.csrfToken);
    }
  });
};

const loadFolio = (csrf) => {
  ReactDOM.render(<Folio csrf={csrf} />, document.querySelector('#folioContainer'));
};

const loadPortals = (csrf) => {
  ReactDOM.render(
    <App csrf={csrf} />,
    document.querySelector('#app')
  );
};

$(document).ready(() => {
  getToken();
});
