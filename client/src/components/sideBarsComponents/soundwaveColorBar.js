import React from "react";
import "../../style/soundwaveColorBar.css";
import { connect } from "react-redux";
import ColorPicker from "../colorPicker";
import { setSWColor } from "../../actions";
class SoundwaveColorBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChangeComplete = color => {
    console.log(color, "  **Sound Wave");
    this.props.setSWColor(color);
  };

  render() {
    const { display } = this.props;
    return (
      <div
        className="soundwaveColBar"
        style={{ display: display ? "flex" : "none" }}
      >
        <div className="swbarTitle">Soundwave Colors</div>
        <div>
          <ColorPicker handleGetColor={this.handleChangeComplete} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = { setSWColor };
export default connect(null, mapDispatchToProps)(SoundwaveColorBar);
