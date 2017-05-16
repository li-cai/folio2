import React, {Component} from 'react';
import classnames from 'classnames';

import ColorPicker from './ColorPicker.js';

class PortalForm extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      titles: [],
      skills: [],
    };

    this.addSkill = this.addSkill.bind(this);
    this.addTitle = this.addTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveColor = this.saveColor.bind(this);
  }

  componentDidMount() {
    const { portalData } = this.props;

    if (portalData) {
      this.setState({
        color: portalData.color,
        name: portalData.label,
        titles: portalData.titles,
        skills: portalData.skills,
      });
    }
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
        color: this.state.color,
        _csrf: this.props.csrf
      };

      if (this.props.portalData) {
        data.id = this.props.portalData._id;
      }

      sendAjax('POST', '/portal', data, function(response) {
        if (response.error) {
          handleError(response.error);
        } else {
          this.props.goToMyPortals();
        }
      }.bind(this));
    }
  }

  saveColor(color) {
    this.setState({ color: color });
  }

  render() {
    const { submitText } = this.props;

    return (
      <div className="portalForm">
        <div id="errorMessage"></div>
        <div className="ui labeled input portalField">
          <div className="ui label">
            Name
          </div>
          <input id="nameLabelField" type="text" placeholder="Enter a name / label for this Portal" value={this.state.name}
            onChange={(e) => { this.setState({ name: e.target.value }); }}
          />
        </div>
        <h3 className="portalHeader">What Titles are you looking for?</h3>
        <div className="ui celled horizontal list">
          {this.state.titles.map((title, index) => (
            <div key={index} className="ui pink label portalPill">
              {title}
              <i className="delete icon" onClick={() => {
                const newTitles = this.state.titles.filter((aTitle, i) => i !== index);
                this.setState({titles: newTitles});
              }}></i>
            </div>
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
            <div key={index} className="ui purple label portalPill">
              {skill}
              <i className="delete icon" onClick={() => {
                const newSkills = this.state.skills.filter((aSkill, i) => i !== index);
                this.setState({skills: newSkills});
              }}></i>
            </div>
          ))}
        </div>
        <div className="ui action input portalField">
          <input id="skillField" type="text" placeholder="Add a Skill (i.e. iOS Dev, UX Design, etc.)"/>
          <button className="ui olive right button" onClick={this.addSkill}>
            Add
          </button>
        </div>
        <h3 className="portalHeader">Pick a Background Color for your Folio Portal:</h3>
        <ColorPicker color={this.state.color} saveColor={this.saveColor} />
        <button className="large ui blue button createButton" onClick={this.handleSubmit}>
          {submitText}
        </button>
      </div>
    );
  }
}

export default PortalForm;
