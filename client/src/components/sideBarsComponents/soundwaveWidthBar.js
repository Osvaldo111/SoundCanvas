import React from "react";
import "../../style/soundwaveWidthBar.css";
import { connect } from "react-redux";

class SoundwaveWidthBar extends React.Component {
  render() {
    const { display } = this.props;
    return (
      <div
        className="soundwaveWidthBar"
        style={{ display: display ? "flex" : "none" }}
      >
        <div>
          <p>Soundwave Width</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(SoundwaveWidthBar);
