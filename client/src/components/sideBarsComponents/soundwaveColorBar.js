import React from "react";
import "../../style/soundwaveColorBar.css";
import { connect } from "react-redux";

class SoundwaveColorBar extends React.Component {
  render() {
    // console.log(this.props);

    const { display } = this.props;
    return (
      <div
        className="soundwaveColBar"
        style={{ display: display ? "flex" : "none" }}
      >
        <div>
          <p>Soundwave Colors</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(SoundwaveColorBar);
