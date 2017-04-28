import React, { Component } from 'react';

class Signup extends Component {

	handleSignup(e) {
		e.preventDefault();

		if ($('#user').val() === '' || $('#pass').val() === '' || $('#pass2').val() === '') {
			handleError('Please fill out all fields.');
			return false;
		}

		if ($('#pass').val() !== $('#pass2').val()) {
			handleError('Please make sure the passwords match.');
			return false;
		}

		sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);

		return false;
	}

	render() {
		return (
			<form id="signupForm" name="signupForm"
				onSubmit={this.handleSignup}
				action="/signup"
				method="POST"
				className="mainForm"
			>
				<div className="ui input textField">
					<input id="user" type="text" name="username" placeholder="Username" />
				</div>
				<div className="ui input textField">
					<input id="pass" type="password" name="pass" placeholder="Password" />
				</div>
				<div className="ui input textField">
					<input id="pass2" type="password" name="pass2" placeholder="Confirm Password" />
				</div>
				<input type="hidden" name="_csrf" value={this.props.csrf} />
				<button className="large ui orange button loginButton" type="submit" form="signupForm" value="Sign Up">Sign Up</button>
				<div className="signUpBlurb">
					Already have an account? <a className="signUpLink" onClick={this.props.onLogin}>Login</a> here!
				</div>
			</form>
		);
	}
}

export default Signup;
