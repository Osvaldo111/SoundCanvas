import React from "react";
import "../../style/soundwaveThickBar.css";
import { connect } from "react-redux";

class SoundwaveThickBar extends React.Component {
  render() {
    const { display } = this.props;
    return (
      <div
        className="soundwaveThickBar"
        style={{ display: display ? "flex" : "none" }}
      >
        <div>
          <p>Soundwave Thickness</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(SoundwaveThickBar);
