import React, { Component } from 'react';
import classnames from 'classnames';

import Settings from './Settings.js';
import Portals from './Portals.js';
import Upgrade from './Upgrade.js';

const AppState = {
	MY_PORTALS: 0,
	SETTINGS: 1,
  UPGRADE: 2,
};

class App extends Component {
	constructor() {
		super();

		this.state = {
			page: AppState.MY_PORTALS
		};
	}

	renderPage() {
		switch (this.state.page) {
			case AppState.SETTINGS:
				return <Settings csrf={this.props.csrf} />;

			case AppState.MY_PORTALS:
				return <Portals csrf={this.props.csrf} />;

      case AppState.UPGRADE:
        return <Upgrade csrf={this.props.csrf} />;

			default:
				break;
		}
	}

	render() {
		return (
			<div id="portalContainer" className="portalContainer">
			  <div className="sideNav">
			    <img className="logo" src="/assets/img/adminlogo.png" />
					<div className={classnames({ sidebarLink: true, active: this.state.page === AppState.MY_PORTALS })}
						onClick={() => this.setState({ page: AppState.MY_PORTALS })}
					>
						My Portals
					</div>
					<div className={classnames({ sidebarLink: true, active: this.state.page === AppState.SETTINGS })}
						onClick={() => this.setState({ page: AppState.SETTINGS })}
					>
						Settings
					</div>
          <div className="bottomNav">
            <div className="sidebarLink" onClick={() => this.setState({ page: AppState.UPGRADE })}>
              Upgrade
            </div>
  					<div className="sidebarLink logout" onClick={() => {
  						window.location = '/logout';
  					}}>
  						Logout
  					</div>
          </div>
			  </div>
				{this.renderPage()}
			</div>
		);
	}
}

export default App;
