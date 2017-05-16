import React, {Component} from 'react';
import classnames from 'classnames';

import MyPortals from './MyPortals.js';
import NewPortal from './NewPortal.js';
import EditPortal from './EditPortal.js';

const AppState = {
  MY_PORTALS: 0,
  NEW_PORTAL: 1,
  EDIT_PORTAL: 2,
};

class Portals extends Component {
  constructor() {
    super();

    this.state = {
      page: AppState.MY_PORTALS
    };

    this.goToNewPortal = this.goToNewPortal.bind(this);
    this.goToMyPortals = this.goToMyPortals.bind(this);
    this.goToEditPortal = this.goToEditPortal.bind(this);
  }

  goToNewPortal() {
    this.setState({page: AppState.NEW_PORTAL});
  }

  goToMyPortals() {
    this.setState({page: AppState.MY_PORTALS});
  }

  goToEditPortal(portalData) {
    this.portalData = portalData;
    this.setState({page: AppState.EDIT_PORTAL});
  }

  renderPage() {
    switch (this.state.page) {
      case AppState.MY_PORTALS:
        return <MyPortals goToNewPortal={this.goToNewPortal} goToEditPortal={this.goToEditPortal} />;

      case AppState.NEW_PORTAL:
        return <NewPortal csrf={this.props.csrf} goToMyPortals={this.goToMyPortals} />

      case AppState.EDIT_PORTAL:
        return <EditPortal
          csrf={this.props.csrf}
          goToMyPortals={this.goToMyPortals}
          portalData={this.portalData}
        />;

      default:
        break;
    }
  }

  render() {
    return (
      <div className="container portals">
        {this.renderPage()}
      </div>
    );
  }
}

export default Portals;
