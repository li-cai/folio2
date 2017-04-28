import ReactDOM from 'react-dom';
import React from 'react';

import Login from './login/Login.js';
import Signup from './login/Signup.js';

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
		setup(result.csrfToken);
	});
};

$(document).ready(() => {
	getToken();
});
