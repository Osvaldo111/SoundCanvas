import React from "react";
import "../style/canvas.css";
import { connect } from "react-redux";
import { changeCanvasWidth } from "../actions";
import { isMobileBttnPress } from "../actions";
import { displayMobileBttn } from "../actions";
import recordBttn from "../images/recordBttn.svg";
import audioUtilities from "../utilities/recording";
import graphs from "../utilities/drawGraphClassic";
import soundWaveThin from "../utilities/graphs/deve";
import resizeCanvas from "../utilities/resizeCanvas";
import canvasSizes from "../utilities/canvasSizes";
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
    this.canvasContainerRef = React.createRef();
    this.state = {
      displayBttn: true,
      canvasWidth: "",
      canvasHeight: "",
      recorderBttn: false,
      arrayOfAmplitud: [],
      developmentVar: "example",
      timeLimitSeconds: 30,
      timeLeft: null,
      cancelReqFrame: false
    };
  }

  develop = () => {
    const canvas = this.canvasRef.current; //dev
    const arrayNum = [10, 20, 30, 40, 50, 97, 20, 86, 20, 13];
    soundWaveThin(canvas, arrayNum);
    // graphs.drawGraphInCanvas(canvas, arrayNum);
  };
  componentDidMount() {
    // Setting up the canvas when init.
    const canvasContainer = resizeCanvas(this.canvasContainerRef);
    canvasSizes(canvasContainer, canvasSize => {
      this.setState({
        canvasWidth: canvasSize.width,
        canvasHeight: canvasSize.height
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const currentMobileNavBttn = this.props.canvasProps.displayMobileBttn;
    const prevMobileNavBttn = prevProps.canvasProps.displayMobileBttn;

    const currentScreenWidth = this.props.windowSize.width;
    const prevScreenWidth = prevProps.windowSize.width;

    const currentSideBarWith = this.props.canvasProps.sideBarWidth;
    const prevSideBarWith = prevProps.canvasProps.sideBarWidth;

    // Listening to the mainpage to get the device client width
    // and height to avoid distortions on the canvas.
    if (currentScreenWidth !== prevScreenWidth) {
      const canvasContainer = {
        width: this.props.windowSize.width,
        height: this.props.windowSize.height
      };
      canvasSizes(canvasContainer, canvasSize => {
        this.setState({
          canvasWidth: canvasSize.width,
          canvasHeight: canvasSize.height
        });
      });
    }

    if (currentMobileNavBttn !== prevMobileNavBttn) {
      if (currentMobileNavBttn) {
        this.setState({ displayBttn: true });
        //Reset reducer init
        this.props.displayMobileBttn(false);
      }
    }

    if (currentSideBarWith !== prevSideBarWith) {
      if (currentSideBarWith !== undefined) {
        const sideBarWidth = this.props.canvasProps.sideBarWidth;
        const canvasContainer = {
          width: this.props.windowSize.width,
          height: this.props.windowSize.height
        };

        canvasSizes(canvasContainer, canvasSize => {
          this.setState({
            canvasWidth: canvasSize.width - sideBarWidth,
            canvasHeight: canvasSize.height - sideBarWidth
          });
        });
      }
    }
  }
  // Request to redraw the graph dynacmically.
  reqFrameGraph = () => {
    const { cancelReqFrame } = this.state;
    const canvas = this.canvasRef.current;
    graphs.drawGraphInCanvas(canvas, this.state.arrayOfAmplitud);
    var reqFrame = requestAnimationFrame(this.reqFrameGraph);

    if (cancelReqFrame) {
      cancelAnimationFrame(reqFrame);
    }
  };

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

  /**
   * This function uses the AnalyserNode interface that
   *  represents a node providing real-time
   * frequency and time-domain analysis information.
   */
  connectionToStreamSource = (analyser, dataArray, audioCtx) => {
    var { timeLimitSeconds } = this.state;
    var counterOfInterval = 0;
    var remainingTime = timeLimitSeconds;

    // Repeat the function every second
    var myInterval = setInterval(() => {
      counterOfInterval++;
      var frequencyData = audioUtilities.getFrequencyData(analyser, dataArray);

      // Updating the array with the frequency amplitud
      // and the time left
      this.setState(
        { arrayOfAmplitud: frequencyData, timeLeft: --remainingTime },
        () => {
          console.log("After setting the Array", frequencyData);
        }
      );
      if (counterOfInterval === timeLimitSeconds) {
        // Stop Recording
        audioCtx.close().then(() => {
          console.log("Stop Recording");
        });

        // Cancel frame request.
        this.setState({ cancelReqFrame: true }, () => {
          clearInterval(myInterval);
        });
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
    const { recorderBttn, timeLimitSeconds } = this.state;
    var time = timeLimitSeconds;
    if (recorderBttn === false) {
      this.setState({ recorderBttn: true, timeLeft: time }, () => {
        // recordAudio();
        this.processAudio(); // Development: Change on click
        this.reqFrameGraph();
      });
    }
  };

  render() {
    const { canvasWidth, canvasHeight } = this.state;
    const { displayBttn, timeLeft } = this.state;
    return (
      <div className="canvasContainer" ref={this.canvasContainerRef}>
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
          <button onClick={this.develop}>Reset</button>
        </div>
        <div className="mobilBttn">
          <img
            onClick={this.isMobileBttnPress}
            src={mobilBttn}
            alt=""
            style={{ display: displayBttn ? "flex" : "none" }}
          />
        </div>
        <p>{timeLeft}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    canvasProps: state.canvas,
    windowSize: state.mainPage
  };
}

const mapDispatchToProps = {
  changeCanvasWidth,
  isMobileBttnPress,
  displayMobileBttn
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
