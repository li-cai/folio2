import React, {Component} from 'react';
import classnames from 'classnames';

import PortalForm from './PortalForm.js';

class EditPortal extends Component {
  componentDidMount() {
    console.log(this.props.portalData);
  }

  render() {
    return (
      <div className="newportal">
        <div className="ui breadcrumb">
          <a className="section" onClick={this.props.goToMyPortals}>My Portals</a>
          <div className="divider">/</div>
          <div className="active section">Edit Portal</div>
        </div>
        <div className="header">
          Edit Portal: {this.props.portalData.label}
        </div>
        <PortalForm
          submitText="Update Portal"
          portalData={this.props.portalData}
          goToMyPortals={this.props.goToMyPortals}
          csrf={this.props.csrf}
        />
      </div>
    );
  }
}

export default EditPortal;
