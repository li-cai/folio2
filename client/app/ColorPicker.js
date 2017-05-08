import React, {Component} from 'react';
import classnames from 'classnames';

const COLORS = ['#A8444D', '#33386F', '#509983', '#D38D45', '#803947', '#35623C'];

class ColorPicker extends Component {
  constructor() {
    super();

    this.state = { selected: 0 };
  }

  render() {
    return (
      <div className="colorpicker">
        {COLORS.map((color, index) => {
          const swatchClass = classnames({
            colorSwatch: true,
            active: index === this.state.selected
          });
          return (
            <div key={index} className={swatchClass} style={{backgroundColor: color}} onClick={function() {
              this.setState({ selected: index });
              this.props.saveColor(COLORS[index]);
            }.bind(this)}></div>
          );
        })}
      </div>
    );
  }
}

export default ColorPicker;
