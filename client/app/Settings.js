import React, { Component } from 'react';
import classnames from 'classnames';

class Settings extends Component {

	handleSubmit(e) {
		e.preventDefault();

		hideMessage('#successMessage');
		hideMessage('#errorMessage');

		if ($('#oldpass').val() === '' || $('#pass').val() === '' || $('#pass2').val() === '') {
			handleError('Please fill out all the fields.');
			return false;
		}

		if ($('#pass').val() !== $('#pass2').val()) {
			handleError('Please make sure the passwords match.');
			return false;
		}

		sendAjax(
			'POST',
			$('#changePasswordForm').attr('action'),
			$('#changePasswordForm').serialize(),
			function(response) {
				handleSuccess(response.message);
				document.querySelector('#changePasswordForm').reset();
			}
		);

		return false;
	}

	render() {
		return (
			<div className="settings">
			  <div className="header">
					Settings
				</div>
				<div id="errorMessage"></div>
				<div id="successMessage"></div>
				<form id="changePasswordForm" name="changePasswordForm"
					onSubmit={this.handleSubmit}
					action="/changePassword"
					method="POST"
					className="mainForm"
				>
					<div className="ui input textField">
						<input id="oldpass" type="password" name="oldpass" placeholder="Old Password" />
					</div>
					<div className="ui input textField">
						<input id="pass" type="password" name="pass" placeholder="New Password" />
					</div>
					<div className="ui input textField">
						<input id="pass2" type="password" name="pass2" placeholder="Confirm New Password" />
					</div>
					<input type="hidden" name="_csrf" value={this.props.csrf} />
					<button className="large ui blue button loginButton" type="submit" form="changePasswordForm" value="changePassword">
						Change Password
					</button>
				</form>
			</div>
		);
	}
}

export default Settings;
