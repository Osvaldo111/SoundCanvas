import React from "react";
import "../style/navBar.css";
import { connect } from "react-redux";
import { isResetBttn } from "../actions";
import { isDownloadCanvas } from "../actions";
/**
 * @author Osvaldo Carrillo
 * Date: 02/08/2020
 * This class is the top navigation bar
 * of the application.
 */
class NavBar extends React.Component {
  isResetBttnPress = () => {
    const { gfCompleted } = this.props.canvasProps;
    if (gfCompleted) {
      this.props.isResetBttn(true);
    } else {
      alert("Please, record something");
    }
  };

  isDownloadBttnPress = () => {
    const { gfCompleted } = this.props.canvasProps;
    if (gfCompleted) {
      this.props.isDownloadCanvas(true);
    } else {
      alert("Please, record something");
    }
  };
  render() {
    return (
      <div className="navBar">
        <div className="navBarLogo">
          <p>Sound Canvas</p>
        </div>
        <div className="navBarBttn">
          <button onClick={this.isResetBttnPress}>
            <p>Reset</p>
          </button>
          <a
            className="bttnEffect"
            id="download"
            download="myImage.jpg"
            onClick={this.isDownloadBttnPress}
          >
            <div id="spinAnim"></div>
            <p>Download</p>
          </a>
          <a
            className="bttnEffect bttnSend"
            id="download"
            download="myImage.jpg"
            onClick={this.isDownloadBttnPress}
          >
            <div id="spinAnim"></div>
            <p>Send</p>
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    canvasProps: state.canvas
  };
}
const mapDispatchToProps = {
  isResetBttn,
  isDownloadCanvas
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
