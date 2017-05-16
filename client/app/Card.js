import React, {Component} from 'react';
import classnames from 'classnames';

const COLORS = ['#C5EFF7', '#FFEB3B', '#87D37C', '#BE90D4'];

class Card extends Component {
  render() {
    const { name, title, skills, email, portfolio, color } = this.props.cardInfo;
    const colorIndex = this.props.colorIndex === 0 || this.props.colorIndex ? this.props.colorIndex : 1;
    const cardColor = color ? color : COLORS[colorIndex];

    return (
      <div className="card" style={{borderTop: `12px solid ${cardColor}`}}>
        <div className="graphic" style={{backgroundColor: cardColor}}></div>
        <div className="info">
          <div className="name">{name}</div>
          <div className="title">{title}</div>
          <div className="interests">Skills: {skills.join(', ')}</div>
          <div className="contact email">{email}</div>
          <a className="contact portfolio" href={portfolio} target="_blank">
            {portfolio}
          </a>
        </div>
      </div>
    );
  }
}

export default Card;
