import React from "react";
import "../../style/backgroundSideBar.css";
import { connect } from "react-redux";
import ColorPicker from "../colorPicker";
import { setCanvasColor } from "../../actions";

class BackgroundSideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChangeComplete = color => {
    this.props.setCanvasColor(color);
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
          <ColorPicker handleGetColor={this.handleChangeComplete} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {
  setCanvasColor
};
export default connect(null, mapDispatchToProps)(BackgroundSideBar);
