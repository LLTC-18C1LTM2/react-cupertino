import React from 'react';
import PropTypes from 'prop-types';
import './PushButton.css';
import { COLORS, GRADIENTS } from '../../styles/ColorSchema';

class PushButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: null,
      fontSize: PushButton.defaultProps.style.fontSize,
      fontFamily: PushButton.defaultProps.style.fontFamily
    };
    this.setSolidColorBackground = this.setSolidColorBackground.bind(this);
    this.setDarkSolidColorBackground = this.setDarkSolidColorBackground.bind(
      this
    );
    this.setGradientBackground = this.setGradientBackground.bind(this);
  }

  componentDidMount() {
    const { color, style } = this.props;
    this.setState({
      background: GRADIENTS[color]
    });

    if (style.fontSize) {
      this.setState({
        fontSize: style.fontSize
      });
    }

    if (style.fontFamily) {
      this.setState({
        fontFamily: style.fontFamily
      });
    }
  }

  setSolidColorBackground() {
    const { color } = this.props;

    this.setState({
      background: COLORS[color]
    });
  }

  setGradientBackground() {
    const { color } = this.props;

    this.setState({
      background: GRADIENTS[color]
    });
  }

  setDarkSolidColorBackground() {
    const { color } = this.props;

    const darkName = `dark${color.charAt(0).toUpperCase()}${color.slice(1)}`;
    this.setState({
      background: COLORS[darkName]
    });
  }

  render() {
    const { background, fontFamily, fontSize } = this.state;
    const { click, size, title } = this.props;

    return (
      <button
        className={`rc-push-button rc-${size}-btn`}
        style={{
          background,
          fontFamily,
          fontSize
        }}
        onMouseEnter={this.setSolidColorBackground}
        onMouseLeave={this.setGradientBackground}
        onMouseUp={this.setGradientBackground}
        onMouseDown={this.setDarkSolidColorBackground}
        onClick={click}
        type="button"
      >
        {title}
      </button>
    );
  }
}

PushButton.defaultProps = {
  color: 'blue',
  size: 'medium',
  style: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '12px'
  },
  title: 'Title'
};

PushButton.propTypes = {
  color: PropTypes.oneOf([
    'blue',
    'grey',
    'green',
    'orange',
    'pink',
    'purple',
    'red',
    'yellow'
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  style: PropTypes.shape({
    fontFamily: PropTypes.string,
    fontSize: PropTypes.string
  }),
  title: PropTypes.string
};

export default PushButton;
