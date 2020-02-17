import React from "react";
import "../style/sideBar.css";
import { connect } from "react-redux";
import { displayMobileBttn } from "../actions";

/**
 * author: Osvaldo Carrillo
 * Date: 02/08/2020
 * This class is designed to be the sidebar or the edition
 * bar in the application.
 */
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      contaninerWidth: false,
      widthFirstSide: null,
      widthSecondSide: null,
      closeMobile: false,
      displayOpacity: false
    };
  }

  closeMobileBar = () => {
    this.setState({
      contaninerWidth: false,
      widthFirstSide: "0px",
      widthSecondSide: "0px",
      displayOpacity: "false"
    });

    // Reducer to display the menu bttn in mobile
    this.props.displayMobileBttn(true);
  };

  displayMobileSideBar = () => {
    this.setState({
      contaninerWidth: true,
      widthFirstSide: "60px",
      widthSecondSide: "190px",
      displayOpacity: "true"
    });
  };

  componentDidUpdate(prevProps) {
    //Check when the mobile bttn is press
    const currentBttnPress = this.props.canvasProps.checkBttnPress;
    const prevBttnPress = prevProps.canvasProps.checkBttnPress;
    if (currentBttnPress != prevBttnPress) {
      console.log(currentBttnPress, "   ", prevBttnPress);
      this.displayMobileSideBar();
    }
  }

  render() {
    const { closeMobile } = this.state;
    const { displayOpacity } = this.state;
    const { contaninerWidth } = this.state;
    console.log(closeMobile);
    return (
      <div
        className="sideBarContainer"
        style={{ width: contaninerWidth ? "100%" : "" }}
      >
        <div
          className="sideBarFirst"
          style={{ width: this.state.widthFirstSide }}
        >
          <p>Backgro</p>
          <p>Backgr</p>
        </div>
        <div
          className="sideBarSecond"
          style={{ width: this.state.widthSecondSide }}
        >
          <div>Backgrounddd</div>
        </div>
        <div
          className="closeSideBar"
          onClick={this.closeMobileBar}
          style={{ flexGrow: displayOpacity ? "1" : "0" }}
          onClick={this.closeMobileBar}
        ></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { canvasProps: state.canvas };
}
const mapDispatchToProps = {
  displayMobileBttn
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
