import React from "react";
import "../style/canvas.css";
import { connect } from "react-redux";
import { changeCanvasWidth } from "../actions";
import { isMobileBttnPress } from "../actions";
import { displayMobileBttn } from "../actions";
import recordBttn from "../images/recordBttn.svg";
import resizeCanvas from "../utilities/resizeCanvas";

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
    this.canvasRef = React.createRef();
    this.state = {
      displayBttn: true,
      canvasWidth: "",
      canvasHeight: ""
    };
  }

  pressBttn = () => {
    alert();
  };

  isMobileBttnPress = () => {
    //Reducer bttn is press.
    this.props.isMobileBttnPress(true);
    //Reducer display bttn
    // this.props.displayMobileBttn(false);
    this.setState({ displayBttn: false });
  };

  componentDidMount() {
    // const canvas = resizeCanvas(this.canvasRef);
    // // console.log(canvas.width);
    // // console.log(canvas.height);
    // if (canvas.width <= 425) {
    //   const newCanvasWidth = canvas.width - 75;
    //   // console.log(newCanvasWidth);
    //   this.setState({
    //     canvasWidth: newCanvasWidth,
    //     canvasHeight: newCanvasWidth
    //   });
    // }
    // window.addEventListener("resize", () => {
    //   const canvas = resizeCanvas(this.canvasRef);
    //   // console.log(canvas.width);
    //   // console.log(canvas.height);
    //   if (canvas.width <= 425) {
    //     const newCanvasWidth = canvas.width - 75;
    //     console.log(newCanvasWidth);
    //     this.setState({
    //       canvasWidth: newCanvasWidth,
    //       canvasHeight: newCanvasWidth
    //     });
    //   }
    // });
  }

  componentWillUnmount() {}

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
    const { canvasWidth, canvasHeight } = this.state;
    const { displayBttn } = this.state;
    return (
      <div className="canvasContainer" ref={this.canvasRef}>
        <canvas
          className="canvas"
          style={{ width: canvasWidth, height: canvasHeight }}
        ></canvas>
        <div className="recordBttn">
          <img src={recordBttn} alt="" onClick={this.pressBttn} />
        </div>
        <div className="resetBttnMobile">
          <button onClick={this.pressBttn}>Reset</button>
        </div>
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
