import React, {Component} from 'react';
import Card from '../app/Card.js';

class Folio extends Component {

  constructor() {
    super();

    this.state = {
      folios: [],
      portal: {},
      isAddShown: false,
      isErrorShown: false,
    };

    this.portalId = window.location.pathname.replace('/', '');

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFolios = this.getFolios.bind(this);
  }

  componentDidMount() {
    const portalId = this.portalId;

    sendAjax('GET', `/portal/${portalId}`, null, function(data) {
      if (data.portal) {
        this.setState({ portal: data.portal });
      }
    }.bind(this), function() {
      this.setState({ isErrorShown: true });
    }.bind(this));

    const formContainer = document.querySelector('#addFolio');
    document.body.addEventListener('click', function(e) {
      if (!formContainer.contains(e.target) && e.target.id !== 'addButton') {
        this.hideForm();
      }
    }.bind(this));

    this.getFolios();
  }

  getFolios() {
    sendAjax('GET', `${this.portalId}/folios`, null, function(data) {
      if (data.folios) {
        this.setState({ folios: data.folios });
      }
    }.bind(this));
  }

  showForm() {
    const formContainer = document.querySelector('#addFolio');
    formContainer.className = 'addFolio is-shown';
    formContainer.style = 'display: inline-block';
  }

  hideForm() {
    const formContainer = document.querySelector('#addFolio');
    formContainer.className = 'addFolio';
    formContainer.style = 'display: none';
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = document.querySelector('#nameField').value;
    const title = document.querySelector('#majorSelect').value;
    const email = document.querySelector('#emailField').value;
    const portfolio = document.querySelector('#portfolioField').value;
    const skills = [];

    const checkboxes = document.querySelectorAll('.checkboxes input');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        skills.push(checkbox.name);
      }
    });

    if (!name || !title || !email || !portfolio || skills.length < 1) {
      handleError('All fields are required');
    } else {
      const { portalId } = this;
      const data = { name, title, email, portfolio, skills, _csrf: this.props.csrf, portalId };
      sendAjax('POST', 'folio', data, function(data) {
        this.hideForm();
        this.getFolios();
      }.bind(this));
    }
  }

  renderTitleOptions() {
    const { portal } = this.state;

    if (portal.titles) {
      return portal.titles.map((title, index) => (
        <option key={index} value={title}>{title}</option>
      ));
    }
  }

  renderSkills() {
    const { portal } = this.state;

    if (portal.skills) {
      return portal.skills.map((skill, index) => (
        <div key={index} className="inlineBlock">
          <input type="checkbox" id={`cbox${index + 1}`} name={skill} />
          <label htmlFor={`cbox${index + 1}`}>{skill}</label>
        </div>
      ));
    }
  }

  render() {
    const { isErrorShown } = this.state;

    return (
      <div className="folioContainer">
        <div className="folioHeader">
          <img className="logo" src="/assets/img/logo.png" />
          {
            !isErrorShown ?
            <img id="addButton" className="addButton" src="/assets/img/add-ico.png" onClick={this.showForm}/> :
            null
          }
        </div>
        {
          isErrorShown ?
          (<div className="noExist">Sorry, this folio portal does not exist :(</div>) :
          null
        }
        <div id="addFolio" className="addFolio">
          <form id="addFolioForm">
            <div className="addFolioForm-upper">
              <section id="errorMessage" className="errorMessage"></section>
              <div>
                <label htmlFor="name">Name</label>
                <input className="fieldBox" id="nameField" type="text" name="name" />
              </div>
              <div>
                <label htmlFor="major">Title</label>
                <select className="fieldBox" id="majorSelect" name="title">
                  {this.renderTitleOptions()}
                </select>
              </div>
              <div>
                <div className="label">Skills</div>
                <div className="checkboxes">
                  {this.renderSkills()}
                </div>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input className="fieldBox" id="emailField" type="email" name="email" />
              </div>
              <div>
                <label htmlFor="portfolio">Portfolio</label>
                <input className="fieldBox" id="portfolioField" type="text" name="portfolio" />
              </div>
            </div>
            <input id="submitButton" type="submit" value="Add Card" onClick={this.handleSubmit}/>
          </form>
        </div>
        <div className="folioCardContainer">
          {this.state.folios.map((folio, index) => {
            let colorIndex = 0;
            const titles = this.state.portal.titles;
            if (titles) {
              colorIndex = titles.indexOf(folio.title) % 4;
            }
            return <Card key={index} cardInfo={folio} colorIndex={colorIndex} />
          })}
        </div>
      </div>
    );
  }
}

export default Folio;
