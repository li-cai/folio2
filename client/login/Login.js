import React, { Component } from 'react';

class Login extends Component {

	handleLogin(e) {
		e.preventDefault();

		if ($('#user').val() === '' || $('#pass').val() === '') {
			handleError('Please fill out all the fields.');
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
				<div className="ui input textField">
					<input id="user" type="text" name="username" placeholder="Username" />
				</div>
				<div className="ui input textField">
					<input id="pass" type="password" name="pass" placeholder="Password" />
				</div>
				<input type="hidden" name="_csrf" value={this.props.csrf} />
				<button className="large ui yellow button loginButton" type="submit" form="loginForm" value="Login">Login</button>
				<div className="signUpBlurb">
					Don't have an account? <a className="signUpLink" onClick={this.props.onSignUp}>Sign Up</a> now!
				</div>
			</form>
		);
	}
}

export default Login;
