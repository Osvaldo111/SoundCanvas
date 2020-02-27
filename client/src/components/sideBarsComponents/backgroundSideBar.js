import React from "react";
import "../../style/backgroundSideBar.css";
import { connect } from "react-redux";
import ColorPicker from "../colorPicker";

class BackgroundSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: "#fff"
    };
  }

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  render() {
    const { display } = this.props;
    return (
      <div
        className="backgroundBar"
        style={{
          display: display ? "flex" : "none"
        }}
      >
        <div className="backSBTitle">Colors</div>
        <div>
          <ColorPicker />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(BackgroundSideBar);
