import ReactDOM from 'react-dom';
import React from 'react';

import Login from './login/Login.js';
import Signup from './login/Signup.js';
import App from './app/App.js';

const renderSignup = (csrf) => {
	const onLogin = () => {
		renderLogin(csrf);
	};

	ReactDOM.render(
		<Signup csrf={csrf} onLogin={onLogin} />,
		document.querySelector('#content')
	);
};

const renderLogin = (csrf) => {
	const onSignUp = () => {
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
		if (document.location.pathname === '/portals') {
			loadPortals(result.csrfToken);
		} else {
			setup(result.csrfToken);
		}
	});
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
