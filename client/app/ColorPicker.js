import React, {Component} from 'react';
import classnames from 'classnames';

const COLORS = ['#A8444D', '#33386F', '#509983', '#D38D45', '#803947', '#35623C'];

class ColorPicker extends Component {
  constructor() {
    super();

    this.state = {  color: COLORS[0] };
  }

  componentDidMount() {
    if (this.props.color) {
      this.setState({ color: this.props.color });
    }
  }

  render() {
    const activeColor = this.props.color ? this.props.color : this.state.color;
    return (
      <div className="colorpicker">
        {COLORS.map((color, index) => {
          const swatchClass = classnames({
            colorSwatch: true,
            active: color === activeColor
          });
          return (
            <div key={index} className={swatchClass} style={{backgroundColor: color}} onClick={function() {
              this.props.saveColor(color);
            }.bind(this)}></div>
          );
        })}
      </div>
    );
  }
}

export default ColorPicker;
