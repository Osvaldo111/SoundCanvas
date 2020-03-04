import React from "react";
import "../../style/soundwaveWidthBar.css";
import { connect } from "react-redux";
import SliderBttn from "../SliderButton";
import { setSWWidth } from "../../actions";

class SoundwaveWidthBar extends React.Component {
  handleSliderValue = value => {
    this.props.setSWWidth(value);
  };
  render() {
    const { display } = this.props;
    return (
      <div
        className="soundwaveWidthBar"
        style={{ display: display ? "flex" : "none" }}
      >
        <div>
          <p className="swWidthkBarTitle">Soundwave Width</p>
        </div>
        <div className="swWidthBarSliCon">
          <SliderBttn handleGetSliderValue={this.handleSliderValue} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {
  setSWWidth
};
export default connect(null, mapDispatchToProps)(SoundwaveWidthBar);
