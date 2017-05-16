import React, { Component } from 'react';
import classnames from 'classnames';

class Upgrade extends Component {
  constructor() {
    super();

    this.state = {
      accountType: 'Basic',
    };
  }

  componentDidMount() {
    sendAjax('GET', '/accountType', null, function(data) {
      if (data.accountType) {
        this.setState({ accountType: data.accountType });
      }
    }.bind(this));
  }

	handleSubmit(e) {
		e.preventDefault();

		return false;
	}

	render() {
		return (
			<div className="container">
        <div className="header">
          Upgrade Account
        </div>
        <div className="ui secondary segment">
          <p>You are currently on the {this.state.accountType} plan.</p>
        </div>
        <h3 className="portalHeader">Please select a plan to upgrade to:</h3>
        <div className="ui yellow segment upgradeSegment">
          <div className="upgradeHeader">Basic</div>
          <div className="upgradeFolios">2 Portals</div>
          <div className="upgradePricing">Free</div>
        </div>
        <div className="ui teal segment upgradeSegment">
          <div className="upgradeHeader">Business</div>
          <div className="upgradeFolios">10 Portals</div>
          <div className="upgradePricing">$49.99</div>
        </div>
        <div className="ui purple segment upgradeSegment">
          <div className="upgradeHeader">Enterprise</div>
          <div className="upgradeFolios">Unlimited Portals</div>
          <div className="upgradePricing">$9.99 / month</div>
        </div>
        <button className="large ui blue button createButton" onClick={this.handleSubmit}>
          Upgrade Account
        </button>
			</div>
		);
	}
}

export default Upgrade;
