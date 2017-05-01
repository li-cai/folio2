import React, {Component} from 'react';
import classnames from 'classnames';

import MyPortals from './MyPortals.js';
import NewPortal from './NewPortal.js';

const AppState = {
  MY_PORTALS: 0,
  NEW_PORTAL: 1
};

class Portals extends Component {
  constructor() {
    super();

    this.state = {
      page: AppState.MY_PORTALS
    };

    this.goToNewPortal = this.goToNewPortal.bind(this);
  }

  goToNewPortal() {
    this.setState({page: AppState.NEW_PORTAL});
  }

  renderPage() {
    switch (this.state.page) {
      case AppState.MY_PORTALS:
        return <MyPortals goToNewPortal={this.goToNewPortal}/>;

      case AppState.NEW_PORTAL:
        return <NewPortal csrf={this.props.csrf} goToMyPortals={() => {
          this.setState({page: AppState.MY_PORTALS});
        }}/>

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
