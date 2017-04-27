import React, { Component } from 'react';

class Login extends Component {

	handleLogin(e) {
		e.preventDefault();

		// $('#domoMessage').animate({ width: 'hide' }, 350);

		if ($('#user').val() === '' || $('#pass').val() === '') {
			handleError('RAWR! Username or password is empty');
			return false;
		}

		console.log($('input[name=_csrf]').val());

		sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);

		return false;
	}

	render() {
		return (
			<form id="loginForm" name="loginForm"
				onSubmit={this.handleLogin}
				action="/login"
				method="POST"
				className="mainForm"
			>
				<label htmlFor="username">Username: </label>
				<input id="user" type="text" name="username" placeholder="username" />
				<label htmlFor="pass">Password: </label>
				<input id="pass" type="password" name="pass" placeholder="password" />
				<input type="hidden" name="_csrf" value={this.props.csrf} />
				<input className="formSubmit" type="submit" value="Sign In"/>
			</form>
		);
	}
}

export default Login;
