import React from "react";
import "../style/sliderBttn.css";
import { connect } from "react-redux";

/**
 * Date: 02/27/2019
 * author: Osvaldo Carrillo
 * This class is designed to allow be a slider button component which
 * return the value selected by the user.
 * This class has to use the method "handleGetSliderValue(value)"
 */
class SliderBttn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value }, () => {
      this.props.handleGetSliderValue(this.state.value);
    });
  };
  render() {
    const { value } = this.state;
    return (
      <div>
        <div className="sliderBttnCtn">
          <input
            type="range"
            min="1"
            max="100"
            value={this.state.value}
            id="myRange"
            onChange={this.handleChange}
          />
        </div>
        <p>
          Value <span>{value}</span>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(SliderBttn);
