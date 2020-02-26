import React from "react";
import "../style/sideBar.css";
import BackgroundSideBar from "./sideBarsComponents/backgroundSideBar";
import SoundwaveColorBar from "./sideBarsComponents/soundwaveColorBar";
import SoundwaveThickBar from "./sideBarsComponents/soundwaveThickBar";
import SoundwaveWidthBar from "./sideBarsComponents/soundwaveWidthBar";
import TextBar from "./sideBarsComponents/textBar";
import closeButtn from "../images/closeButton.svg";
import { connect } from "react-redux";
import { displayMobileBttn } from "../actions";
import { isMobileBttnPress } from "../actions";
/**
 * author: Osvaldo Carrillo
 * Date: 02/08/2020
 * This class is designed to be the sidebar or the edition
 * bar in the application.
 */
class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySideBar: "",
      displayBackgroundBar: false,
      displaySWColorBar: false,
      displaySWThickBar: false,
      displaySWWidthBar: false,
      displayTextBar: false
    };
  }

  componentDidUpdate(prevProps) {
    //Check when the mobile bttn is press
    const currentMobileNavPress = this.props.canvasProps.checkBttnPress;
    const prevMobileNavPress = prevProps.canvasProps.checkBttnPress;

    if (currentMobileNavPress !== prevMobileNavPress) {
      if (currentMobileNavPress) {
        this.displayMobileSideBar();
        // Reducer init
        this.props.isMobileBttnPress(false);
      }
    }
  }

  closeMobileBar = () => {
    this.setState({
      displaySideBar: false,
      displayBackgroundBar: false,
      displaySWColorBar: false,
      displaySWThickBar: false,
      displaySWWidthBar: false,
      displayTextBar: false,
      displaySecondSideBar: false
    });

    // Reducer to display the menu bttn in mobile
    this.props.displayMobileBttn(true);
  };

  closeSecondaryBarDesk = () => {
    this.setState({
      displaySideBar: false,
      displayBackgroundBar: false,
      displaySWColorBar: false,
      displaySWThickBar: false,
      displaySWWidthBar: false,
      displayTextBar: false,
      displaySecondSideBar: false
    });
  };
  displayMobileSideBar = () => {
    this.setState({
      displaySideBar: true,
      // Init background bar
      displayBackgroundBar: true,
      displaySWColorBar: false,
      displaySWThickBar: false,
      displaySWWidthBar: false,
      displayTextBar: false
    });
  };

  displayBackgroundBar = () => {
    this.setState({
      displaySecondSideBar: true,
      displayBackgroundBar: true,
      displaySWColorBar: false,
      displaySWThickBar: false,
      displaySWWidthBar: false,
      displayTextBar: false
    });
  };

  displaySWColorBar = () => {
    this.setState({
      displaySecondSideBar: true,
      displayBackgroundBar: false,
      displaySWColorBar: true,
      displaySWThickBar: false,
      displaySWWidthBar: false,
      displayTextBar: false
    });
  };

  displaySWCThickBar = () => {
    this.setState({
      displaySecondSideBar: true,
      displayBackgroundBar: false,
      displaySWColorBar: false,
      displaySWThickBar: true,
      displaySWWidthBar: false,
      displayTextBar: false
    });
  };

  displaySWWidth = () => {
    this.setState({
      displaySecondSideBar: true,
      displayBackgroundBar: false,
      displaySWColorBar: false,
      displaySWThickBar: false,
      displaySWWidthBar: true,
      displayTextBar: false
    });
  };

  displayTextBar = () => {
    this.setState({
      displaySecondSideBar: true,
      displayBackgroundBar: false,
      displaySWColorBar: false,
      displaySWThickBar: false,
      displaySWWidthBar: false,
      displayTextBar: true
    });
  };

  render() {
    const { displaySideBar, displaySecondSideBar } = this.state;

    return (
      <div
        className="sideBarContainer"
        style={{ display: displaySideBar ? "flex" : "" }}
      >
        <div className="sideBarFirst">
          <p
            onClick={this.displayBackgroundBar}
            className="sideBarSelection"
            style={{
              backgroundColor: this.state.displayBackgroundBar ? "#434e5e" : ""
            }}
          >
            Background
          </p>
          <p onClick={this.displaySWColorBar} className="sideBarSelection">
            Sound Wave<br></br>Color
          </p>
          <p onClick={this.displaySWCThickBar} className="sideBarSelection">
            Sound Wave<br></br>Thickness
          </p>
          <p onClick={this.displaySWWidth} className="sideBarSelection">
            Sound Wave<br></br>Width
          </p>
          <p onClick={this.displayTextBar} className="sideBarSelection">
            Text
          </p>
        </div>
        <div
          className="sideBarSecond"
          style={{ display: displaySecondSideBar ? "flex" : "" }}
        >
          <BackgroundSideBar display={this.state.displayBackgroundBar} />
          <SoundwaveColorBar display={this.state.displaySWColorBar} />
          <SoundwaveThickBar display={this.state.displaySWThickBar} />
          <SoundwaveWidthBar display={this.state.displaySWWidthBar} />
          <TextBar display={this.state.displayTextBar} />
          <div className="sideBarCloseDesk">
            <img
              onClick={this.closeSecondaryBarDesk}
              src={closeButtn}
              alt=""
              className="sideBarClosebttn"
            />
          </div>
        </div>
        <div className="closeSideBar" onClick={this.closeMobileBar}></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { canvasProps: state.canvas };
}
const mapDispatchToProps = {
  displayMobileBttn,
  isMobileBttnPress
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
