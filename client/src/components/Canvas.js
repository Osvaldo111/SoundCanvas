import React from "react";
import "../style/canvas.css";
import { connect } from "react-redux";
import { changeCanvasWidth } from "../actions";
import { isMobileBttnPress } from "../actions";
import { displayMobileBttn } from "../actions";
import recordBttn from "../images/recordBttn.svg";
// import audioUtilities from "../utilities/resizeCanvas";
import audioUtilities from "../utilities/recording";
import graphs from "../utilities/drawGraphClassic";

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
      canvasWidth: 600,
      canvasHeight: 600,
      recorderBttn: false,
      arrayOfAmplitud: [],
      developmentVar: "example"
    };
  }

  componentDidMount() {
    this.processAudio(); // Development: Change on click
    this.drawClassicGraph();
  }

  drawClassicGraph = () => {
    const canvas = this.canvasRef.current;
    var arrAmplitud = [10, 20, 30, 100];
    graphs.drawGraphInCanvas(canvas, this.state.arrayOfAmplitud);
    requestAnimationFrame(this.drawClassicGraph);
  };

  componentDidUpdate(prevProps, prevState) {
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

  /**
   * This function is designed to check and as for permission
   * to record the audio from the user. This implemets the
   * getUserMedia method from the Media devices to received the
   * MediaStream object which consists of several audio tracks.
   * Also, this function connects the stream to the AudioContext
   * and the AnalyserNode to get the frequency data. This function sets the
   * Audio Context interface that represents an audio-proccesing graph build
   * from audio modules.
   * This interface uses the createMediaStreamSource method to create a
   * MediaElementAudioSourceNode from which the audio can be manipulated.
   * The AnalyserNode interface represents a node that provides real-time
   * frequency and time-domain analysis information.
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
   */
  processAudio = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true
          }
        )
        // Success callback
        .then(stream => {
          // Setting the Audio Context parameters
          console.log("Context");
          var audioCtx = new (window.AudioContext ||
            window.webkitAudioContext)();
          var analyser = audioCtx.createAnalyser();
          analyser.minDecibels = -90;
          analyser.maxDecibels = -10;
          analyser.smoothingTimeConstant = 0;
          var source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          // The fftSize is converted half the value
          // for technical resons.
          analyser.fftSize = 32;
          var bufferLength = analyser.frequencyBinCount;
          var dataArray = new Uint8Array(bufferLength);

          // Connection to Visualize the Data.
          this.connectionToStreamSource(analyser, dataArray, audioCtx);

          // drawGraphInCanvas();
        })
        // Error callback
        .catch(function(err) {
          console.log("The following getUserMedia error occured: " + err);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  };

  connectionToStreamSource = (analyser, dataArray, audioCtx) => {
    var counterOfInterval = 0;
    var myInterval = setInterval(() => {
      counterOfInterval++;
      var frequencyData = audioUtilities.getFrequencyData(analyser, dataArray);
      this.setState({ arrayOfAmplitud: frequencyData }, () => {
        console.log("After setting the Array", frequencyData);
      });
      if (counterOfInterval === 5) {
        audioCtx.close().then(() => {
          console.log("Stop Recording");
        });
        clearInterval(myInterval);
      }
    }, 1000);
  };

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

  isRecorderBttnPressed = () => {
    const { recorderBttn } = this.state;
    if (recorderBttn === false) {
      this.setState({ recorderBttn: true }, () => {
        // recordAudio();
      });
    }
  };

  // componentDidMount() {
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
  // }

  render() {
    const { canvasWidth, canvasHeight } = this.state;
    const { displayBttn, arrayOfAmplitud } = this.state;
    return (
      <div className="canvasContainer">
        <canvas
          className="canvas"
          width={canvasWidth}
          height={canvasHeight}
          /* style={{ width: canvasWidth, height: canvasHeight }} */
          ref={this.canvasRef}
        ></canvas>
        <div className="recordBttn">
          <img src={recordBttn} alt="" onClick={this.isRecorderBttnPressed} />
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
        <p>{arrayOfAmplitud.length}</p>
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
