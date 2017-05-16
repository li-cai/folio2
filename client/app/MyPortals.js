import React, {Component} from 'react';
import classnames from 'classnames';

import Card from './Card.js';

class MyPortals extends Component {
  constructor() {
    super();

    this.state = {
      portals: []
    };
  }

  componentDidMount() {
    sendAjax('GET', '/getPortals', null, function(data) {
      if (data.portals && data.portals.length > 0) {
        this.setState({ portals: data.portals });
      }
    }.bind(this));
  }

  renderPortals() {
    const portals = this.state.portals;

    if (portals.length < 1) {
      return (<div>No portals have been created yet.</div>);
    } else {
      return portals.map((portal, index) => {
        const cardInfo = {
          name: 'Someone\'s Name',
          title: portal.titles[0],
          skills: portal.skills,
          color: portal.color,
          email: 'interested@folio.com',
          portfolio: 'myporfolio.com'
        };
        return (
          <div key={index} className="portalCard">
            <Card cardInfo={cardInfo} />
            <div className="portalLabel">
              <div className="portalNumber">{index + 1}</div>
              {portal.label}
              <a className="portalLink" href={`/${portal._id}`} target="_blank">
                <i className="external icon"></i>
              </a>
              <a className="portalLink" onClick={() => {
                this.props.goToEditPortal(portal);
              }}>
                <i className="edit icon"></i>
              </a>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="myportals">
        <div className="header">
          My Portals
          <button className="medium ui olive button newPortalButton" onClick={this.props.goToNewPortal}>
            New Portal
          </button>
        </div>
        <div className="cardContainer">
          {this.renderPortals()}
        </div>
      </div>
    );
  }
}

export default MyPortals;
