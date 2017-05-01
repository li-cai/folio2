import React, {Component} from 'react';
import classnames from 'classnames';

class Card extends Component {
  render() {
    const { name, title, skills, email, portfolio } = this.props.cardInfo;
    return (
      <div className="card">
        <div className="graphic"></div>
        <div className="info">
          <div className="name">{name}</div>
          <div className="title">{title}</div>
          <div className="interests">Skills: {skills.join(', ')}</div>
          <div className="contact email">{email}</div>
          <a className="contact portfolio">{portfolio}</a>
        </div>
      </div>
    );
  }
}

export default Card;
