import React from "react";
import "../style/mainPage.css";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Canvas from "../components/Canvas";
import { connect } from "react-redux";
import { setScreenSize } from "../actions";

/**
 * @author Osvaldo Carrillo
 * Date: 02/08/2020
 * This class should hold all the components of the main page
 * of the application.
 */
class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.canvasContainerRef = React.createRef();
  }

  componentDidMount() {
    //Init the width and height
    const widthScreen = this.canvasContainerRef.current.clientWidth;
    const heightScreen = this.canvasContainerRef.current.clientHeight;
    this.props.setScreenSize(widthScreen, heightScreen);

    // Set the hight and width when resizing.
    window.addEventListener("resize", () => {
      const widthScreen = this.canvasContainerRef.current.clientWidth;
      const heightScreen = this.canvasContainerRef.current.clientHeight;
      this.props.setScreenSize(widthScreen, heightScreen);
    });
  }

  render() {
    return (
      <div className="mainPageContainer" ref={this.canvasContainerRef}>
        <NavBar />
        <div className="bottomContainer">
          <SideBar />
          <Canvas />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { screenSize: state };
}

const mapDispatchToProps = {
  setScreenSize
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
