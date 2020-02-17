import React from "react";
import "../style/canvas.css";
import { connect } from "react-redux";
import { changeCanvasWidth } from "../actions";
import { isMobileBttnPress } from "../actions";
import { displayMobileBttn } from "../actions";

import mobilBttn from "../images/menu-bttn.svg";
/**
 * author: Osvaldo Carrillo
 * Date: 02/08/2020
 * This class represents the canvas on which the
 * sound wave is drawn.
 */
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayBttn: true
    };
  }

  pressBttn = () => {
    alert();
  };

  /**
   * JUST A TEST
   */

  isMobileBttnPress = () => {
    //Reducer bttn is press.
    this.props.isMobileBttnPress(true);
    //Reducer display bttn
    // this.props.displayMobileBttn(false);
    this.setState({ displayBttn: false });
  };

  componentDidUpdate(prevProps) {
    const currentMobileNavBttn = this.props.canvasProps.displayMobileBttn;
    const prevMobileNavBttn = prevProps.canvasProps.displayMobileBttn;

    if (currentMobileNavBttn !== prevMobileNavBttn) {
      if (currentMobileNavBttn) {
        this.setState({ displayBttn: true });
        //Reset reducer init
        this.props.displayMobileBttn(false);
      }
    }
  }

  render() {
    const { displayBttn } = this.state;
    return (
      <div className="canvasContainer">
        <canvas className="canvas"> </canvas>
        <div>Osvlslsl</div>
        <div>dlmdlemel</div>
        <button onClick={this.pressBttn}>osos</button>
        <div className="mobilBttn">
          <img
            onClick={this.isMobileBttnPress}
            src={mobilBttn}
            alt=""
            style={{ display: displayBttn ? "flex" : "none" }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { canvasProps: state.canvas };
}

const mapDispatchToProps = {
  changeCanvasWidth,
  isMobileBttnPress,
  displayMobileBttn
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
