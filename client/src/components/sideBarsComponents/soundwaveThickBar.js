import React from "react";
import "../../style/soundwaveThickBar.css";
import { connect } from "react-redux";
import SliderBttn from "../SliderButton";
import { setSWThick } from "../../actions";

class SoundwaveThickBar extends React.Component {
  handleSliderValue = value => {
    this.props.setSWThick(value);
  };
  render() {
    const { display } = this.props;
    return (
      <div
        className="soundwaveThickBar"
        style={{ display: display ? "flex" : "none" }}
      >
        <div className="swThickBarTitle">Soundwave Thickness</div>
        <div className="swThickBarSliCon">
          <SliderBttn handleGetSliderValue={this.handleSliderValue} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {
  setSWThick
};
export default connect(null, mapDispatchToProps)(SoundwaveThickBar);
