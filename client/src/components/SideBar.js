import React from "react";
import "../style/sideBar.css";
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
      displaySideBar: ""
    };
  }

  closeMobileBar = () => {
    this.setState({
      displaySideBar: false
    });

    // Reducer to display the menu bttn in mobile
    this.props.displayMobileBttn(true);
  };

  displayMobileSideBar = () => {
    this.setState({
      displaySideBar: true
    });
  };

  componentDidUpdate(prevProps) {
    //Check when the mobile bttn is press
    const currentMobileNavPress = this.props.canvasProps.checkBttnPress;
    const prevMobileNavPress = prevProps.canvasProps.checkBttnPress;

    if (currentMobileNavPress !== prevMobileNavPress) {
      if (currentMobileNavPress) {
        console.log(currentMobileNavPress, "   ", prevMobileNavPress);
        this.displayMobileSideBar();
        // Reducer init
        this.props.isMobileBttnPress(false);
      }
    }
  }

  render() {
    const { displaySideBar } = this.state;

    return (
      <div
        className="sideBarContainer"
        style={{ display: displaySideBar ? "flex" : "" }}
      >
        <div className="sideBarFirst">
          <p>Backgro</p>
          <p>Backgr</p>
        </div>
        <div className="sideBarSecond">
          <div>Backgrounddd</div>
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
