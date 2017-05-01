import React, {Component} from 'react';
import classnames from 'classnames';

class NewPortal extends Component {

  constructor() {
    super();

    this.state = {
      titles: [],
      skills: []
    };

    this.addSkill = this.addSkill.bind(this);
    this.addTitle = this.addTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addSkill(e) {
    const skill = document.querySelector('#skillField').value;

    if (skill) {
      const newSkills = this.state.skills;
      newSkills.push(skill);

      this.setState({skills: newSkills});

      // clear field
      $('#skillField').val('');
    }
  }

  addTitle(e) {
    const title = document.querySelector('#titleField').value;

    if (title) {
      const newTitles = this.state.titles;
      newTitles.push(title);

      this.setState({titles: newTitles});

      // clear field
      $('#titleField').val('');
    }
  }

  handleSubmit(e) {
    hideMessage('#errorMessage');

    const label = $('#nameLabelField').val();
    const titles = this.state.titles;
    const skills = this.state.skills;

    if (skills.length < 1 || titles.length < 1 || label === '') {
      handleError('Please fill out all fields');
    } else {
      const data = {
        label,
        titles,
        skills,
        _csrf: this.props.csrf
      };

      sendAjax('POST', '/portal', data, function(response) {
        if (response.error) {
          handleError(response.error);
        } else {
          this.props.goToMyPortals();
        }
      }.bind(this));
    }
  }

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
        <div id="errorMessage"></div>
        <div className="ui labeled input portalField">
          <div className="ui label">
            Name
          </div>
          <input id="nameLabelField" type="text" placeholder="Enter a name / label for this Portal"/>
        </div>
        <h3 className="portalHeader">What Titles are you looking for?</h3>
        <div className="ui celled horizontal list">
          {this.state.titles.map((title, index) => (
            <div key={index} className="ui pink label portalPill">{title}</div>
          ))}
        </div>
        <div className="ui action input portalField">
          <input id="titleField" type="text" placeholder="Add a Title (i.e. Graphic Designer)"/>
          <button className="ui olive right button" onClick={this.addTitle}>
            Add
          </button>
        </div>
        <h3 className="portalHeader">What Skills are you looking for?</h3>
        <div className="ui celled horizontal list">
          {this.state.skills.map((skill, index) => (
            <div key={index} className="ui purple label portalPill">{skill}</div>
          ))}
        </div>
        <div className="ui action input portalField">
          <input id="skillField" type="text" placeholder="Add a Skill (i.e. iOS Dev, UX Design, etc.)"/>
          <button className="ui olive right button" onClick={this.addSkill}>
            Add
          </button>
        </div>
        <button className="large ui blue button createButton" onClick={this.handleSubmit}>
          Create Portal
        </button>
      </div>
    );
  }
}

export default NewPortal;
