import React, {Component} from 'react';
import classnames from 'classnames';

import PortalForm from './PortalForm.js';

class NewPortal extends Component {
  render() {
    return (
      <div className="newportal">
        <div className="ui breadcrumb">
          <a className="section" onClick={this.props.goToMyPortals}>My Portals</a>
          <div className="divider">/</div>
          <div className="active section">New Portal</div>
        </div>
        <div className="header">
          Create a New Portal
        </div>
        <PortalForm
          submitText="Create Portal"
          goToMyPortals={this.props.goToMyPortals}
          csrf={this.props.csrf}
        />
      </div>
    );
  }
}

export default NewPortal;
