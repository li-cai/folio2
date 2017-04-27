import Login from './login/Login.js';
import ReactDOM from 'react-dom';
import React from 'react';

// const handleLogin = (e) => {
// 	e.preventDefault();
//
// 	$('#domoMessage').animate({ width: 'hide' }, 350);
//
// 	if ($('#user').val() === '' || $('#pass').val() === '') {
// 		handleError('RAWR! Username or password is empty');
// 		return false;
// 	}
//
// 	console.log($('input[name=_csrf]').val());
//
// 	sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);
//
// 	return false;
// };

const handleSignup = (e) => {
	e.preventDefault();

	$('#domoMessage').animate({ width: 'hide' }, 350);

	if ($('#user').val() === '' || $('#pass').val() === '' || $('#pass2').val() === '') {
		handleError('RAWR! All fields are required');
		return false;
	}

	if ($('#user').val() !== $('#pass').val()) {
		handleError('RAWR! Passwords do not match');
		return false;
	}

	sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);

	return false;
};

// const renderLogin = function() {
// 	return (
// 		<form id="loginForm" name="loginForm"
// 			onSubmit={this.handleSubmit}
// 			action="/login"
// 			method="POST"
// 			className="mainForm"
// 		>
// 			<label htmlFor="username">Username: </label>
// 			<input id="user" type="text" name="username" placeholder="username" />
// 			<label htmlFor="pass">Password: </label>
// 			<input id="pass" type="password" name="pass" placeholder="password" />
// 			<input type="hidden" name="_csrf" value={this.props.csrf} />
// 			<input className="formSubmit" type="submit" value="Sign In"/>
// 		</form>
// 	);
// };

const renderSignup = function() {
	return (
		<form id="signupForm" name="signupForm"
			onSubmit={this.handleSubmit}
			action="/signup"
			method="POST"
			className="mainForm"
		>
			<label htmlFor="username">Username: </label>
			<input id="user" type="text" name="username" placeholder="username" />
			<label htmlFor="pass">Password: </label>
			<input id="pass" type="password" name="pass" placeholder="password" />
			<label htmlFor="pass2">Password: </label>
			<input id="pass2" type="password" name="pass2" placeholder="retype password" />
			<input type="hidden" name="_csrf" value={this.props.csrf} />
			<input className="formSubmit" type="submit" value="Sign Up"/>
		</form>
	);
};

const createLoginWindow = (csrf) => {
	const LoginWindow = React.createClass({
		handleSubmit: handleLogin,
		render: renderLogin
	});

	ReactDOM.render(
		<LoginWindow csrf={csrf} />,
		document.querySelector('#content')
	);
};

const createSignupWindow = (csrf) => {
	const SignupWindow = React.createClass({
		handleSubmit: handleSignup,
		render: renderSignup
	});

	ReactDOM.render(
		<SignupWindow csrf={csrf} />,
		document.querySelector('#content')
	);
};

const setup = (csrf) => {
	// const loginButton = document.querySelector('#loginButton');
	// const signupButton = document.querySelector('#signupButton');
	//
	// signupButton.addEventListener('click', (e) => {
	// 	e.preventDefault();
	// 	createSignupWindow(csrf);
	// 	return false;
	// });
	//
	// loginButton.addEventListener('click', (e) => {
	// 	e.preventDefault();
	// 	createLoginWindow(csrf);
	// 	return false;
	// });

	// createLoginWindow(csrf);
	ReactDOM.render(
		<Login csrf={csrf} />,
		document.querySelector('#content')
	);
};

const getToken = () => {
	sendAjax('GET', '/getToken', null, (result) => {
		setup(result.csrfToken);
	});
};

$(document).ready(() => {
	getToken();
});
