import React from "react";
import "../style/canvas.css";
import { connect } from "react-redux";
import { changeCanvasWidth } from "../actions";
import { isMobileBttnPress } from "../actions";
import { displayMobileBttn } from "../actions";
import { isResetBttn } from "../actions";
import { isGraphCompleted } from "../actions";
import recordBttn from "../images/recordBttn.svg";
import audioUtilities from "../utilities/recording";
import soundWaveThin from "../utilities/graphs/deve";
import resizeCanvas from "../utilities/resizeCanvas";
import canvasSizes from "../utilities/canvasSizes";
import mobilBttn from "../images/menu-bttn.svg";
import { dragObject } from "../utilities/dragObject";
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
    this.inputTxtRef = React.createRef();
    this.state = {
      displayBttn: true,
      canvasWidth: "",
      canvasHeight: "",
      recorderBttn: false,
      arrayOfAmplitud: [],
      developmentVar: "example",
      timeLimitSeconds: 30,
      cancelReqFrame: false,
      canvasColor: "#fff",
      soundWaveColor: "#000000",
      stopRecording: false,
      inputValue: "TEXT HERE",
      displayText: false
    };
    console.log(this.props);
  }

  devArray = callback => {
    var array = [];
    for (let index = 0; index < 30; index++) {
      array.push(Math.floor(Math.random() * 100) + 1);
    }
    callback(array);
  };

  develop = () => {
    // this.devArray(array => {
    //   console.log("The array: ", array);
    //   const canvas = this.canvasRef.current; //dev
    //   // const { arrayOfAmplitud } = this.state;
    //   soundWaveThin(canvas, array, "red", 7, 1);
    // });

    const canvas = this.canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    var text = "Hello World";
    const measureText = Math.round(ctx.measureText(text).width);
    const canvasWidth = canvas.width;
    const centerTxtWid = canvasWidth / 2 - measureText / 2;

    console.log(centerTxtWid);
    ctx.fillText(text, centerTxtWid, 600);
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
    const canvas = this.canvasRef.current;
    const { arrayOfAmplitud } = this.state;

    const currentMobileNavBttn = this.props.canvasProps.displayMobileBttn;
    const prevMobileNavBttn = prevProps.canvasProps.displayMobileBttn;

    const currentScreenWidth = this.props.windowSize.width;
    const prevScreenWidth = prevProps.windowSize.width;

    const currentSideBarWith = this.props.canvasProps.sideBarWidth;
    const prevSideBarWith = prevProps.canvasProps.sideBarWidth;

    const currCanvasCol = this.props.canvasProps.canvasColor;
    const prevCanvasCol = prevProps.canvasProps.canvasColor;

    const currSWCol = this.props.canvasProps.swColor;
    const prevSWCol = prevProps.canvasProps.swColor;

    const currSWThick = this.props.canvasProps.swThick;
    const prevSWThick = prevProps.canvasProps.swThick;

    const currResetBttn = this.props.canvasProps.resetBttn;
    const prevResetBttn = prevProps.canvasProps.resetBttn;

    const currSWWidth = this.props.canvasProps.swWidth;
    const prevSWWidth = prevProps.canvasProps.swWidth;

    const currCanvasTxt = this.props.canvasProps.canvasTxt;
    const prevCanvasTxt = prevProps.canvasProps.canvasTxt;

    const currTxtSize = this.props.canvasProps.fontSize;
    const prevTxtSize = prevProps.canvasProps.fontSize;

    const currTxtColor = this.props.canvasProps.fontColor;
    const prevTxtColor = prevProps.canvasProps.fontColor;

    // Listening to the mainpage to get the device client width
    // and height to avoid distortions on the canvas.
    if (currentScreenWidth !== prevScreenWidth) {
      this.redrawGraphOnResize(canvas, arrayOfAmplitud, currSWCol, currSWThick);
      this.positionInutTxtOnResize();
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
          this.setState(
            {
              canvasWidth: canvasSize.width - sideBarWidth,
              canvasHeight: canvasSize.height - sideBarWidth
            },
            () => {
              if (arrayOfAmplitud.length !== 0) {
                soundWaveThin(canvas, arrayOfAmplitud, currSWCol, currSWThick);
              }
            }
          );
        });
      }
    }

    if (currCanvasCol !== prevCanvasCol) {
      if (currCanvasCol) {
        this.setState({ canvasColor: currCanvasCol });
      }
    }

    if (currSWCol !== prevSWCol) {
      if (currSWCol) {
        soundWaveThin(
          canvas,
          arrayOfAmplitud,
          currSWCol,
          currSWThick,
          currSWWidth
        );
        this.setState({ soundWaveColor: currSWCol });
      }
    }

    if (currSWThick !== prevSWThick) {
      if (currSWThick) {
        soundWaveThin(
          canvas,
          this.state.arrayOfAmplitud,
          currSWCol,
          currSWThick,
          currSWWidth
        );
      }
    }

    if (currSWWidth !== prevSWWidth) {
      soundWaveThin(
        canvas,
        this.state.arrayOfAmplitud,
        currSWCol,
        currSWThick,
        currSWWidth
      );
    }

    if (currResetBttn !== prevResetBttn) {
      if (currResetBttn) {
        this.resetTheCanvas(canvas);
        // Init
        this.props.isResetBttn(false);
        this.props.isGraphCompleted(false);
      }
    }

    if (currCanvasTxt !== prevCanvasTxt) {
      if (currCanvasTxt) {
        this.setState({ displayText: true });
      } else {
        this.setState({ displayText: false });
      }
    }

    if (currTxtSize !== prevTxtSize) {
      if (currCanvasTxt) {
        const inputTxt = this.inputTxtRef.current;
        inputTxt.style.fontSize = currTxtSize + "px";
      }
    }

    if (currTxtColor !== prevTxtColor) {
      if (currCanvasTxt) {
        const inputTxt = this.inputTxtRef.current;
        inputTxt.style.color = currTxtColor;
      }
    }
  }

  /**
   * Reset the drawing of the canvas.
   */
  resetTheCanvas = canvas => {
    this.setState(
      {
        arrayOfAmplitud: [],
        recorderBttn: false,
        stopRecording: false,
        cancelReqFrame: false,
        canvasColor: "#fff"
      },
      () => {
        const { arrayOfAmplitud } = this.state;
        soundWaveThin(canvas, arrayOfAmplitud);
      }
    );
  };

  redrawGraphOnResize = (canvas, arrayOfAmplitud, swCol, swThick) => {
    const canvasContainer = {
      width: this.props.windowSize.width,
      height: this.props.windowSize.height
    };
    canvasSizes(canvasContainer, canvasSize => {
      this.setState(
        {
          canvasWidth: canvasSize.width,
          canvasHeight: canvasSize.height
        },
        () => {
          if (arrayOfAmplitud.length !== 0) {
            soundWaveThin(canvas, arrayOfAmplitud, swCol, swThick);
          }
        }
      );
    });
  };
  // Request to redraw the graph dynacmically.
  reqFrameGraph = () => {
    const { cancelReqFrame } = this.state;
    const canvas = this.canvasRef.current;
    soundWaveThin(
      canvas,
      this.state.arrayOfAmplitud,
      null,
      null,
      null,
      canvasEnd => {
        if (canvasEnd) {
          this.setState({ stopRecording: true });
        }
      }
    );

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
    // Reset the array on utilities
    audioUtilities.resetArrayOfAmplitud();

    // Repeat the function every 16 miliseconds
    var myInterval = setInterval(() => {
      const { stopRecording } = this.state;
      var frequencyData = audioUtilities.getFrequencyData(analyser, dataArray);

      // Updating the array with the frequency amplitud
      // and the time left
      this.setState({
        arrayOfAmplitud: frequencyData
      });
      if (stopRecording) {
        // Stop Recording
        audioCtx.close().then(() => {
          console.log("Stop Recording");
        });

        // Cancel frame request.
        this.setState({ cancelReqFrame: true }, () => {
          clearInterval(myInterval);
        });

        //The graph is completed.
        this.props.isGraphCompleted(true);
      }
    }, 16);
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
        console.log("The button is pressed");
        // recordAudio();
        this.processAudio(); // Development: Change on click
        this.reqFrameGraph();
      });
    }
  };

  isResetBttnPressMobile = () => {
    const { gfCompleted } = this.props.canvasProps;
    if (gfCompleted) {
      this.props.isResetBttn(true);
    } else {
      alert("Please, record something");
    }
  };

  resizeInputField = () => {
    const txtInput = this.inputTxtRef.current;
    const valLength = txtInput.value.length;
    if (valLength > 5) txtInput.size = txtInput.value.length;
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  dragElementInput = event => {
    const canvas = this.canvasRef.current;
    const inputText = this.inputTxtRef.current;
    dragObject(event, inputText, canvas);
  };

  positionInutTxtOnResize = () => {
    const inputTxt = this.inputTxtRef.current;
    inputTxt.style.top = "45%";
    inputTxt.style.left = "45%";
  };

  render() {
    const { canvasWidth, canvasHeight, canvasColor, recorderBttn } = this.state;
    const { displayBttn } = this.state;
    const { gfCompleted } = this.props.canvasProps;

    return (
      <div className="canvasContainer" ref={this.canvasContainerRef}>
        <div className="canvasSection">
          <canvas
            className="canvas"
            width={canvasWidth}
            height={canvasHeight}
            ref={this.canvasRef}
            style={{ backgroundColor: canvasColor }}
          ></canvas>
          <input
            type="text"
            onMouseDown={this.dragElementInput}
            className="inputTextCanvas"
            ref={this.inputTxtRef}
            value={this.state.inputValue}
            onKeyDown={this.resizeInputField}
            onChange={this.handleChange}
            style={{
              display: this.state.displayText ? "inline-block" : "none"
            }}
          />
        </div>

        <div className="recordBttn">
          <img
            src={recordBttn}
            alt=""
            onClick={this.isRecorderBttnPressed}
            style={{ opacity: recorderBttn ? ".5" : "" }}
          />
        </div>
        <div className="resetBttnMobile">
          <button
            onClick={this.isResetBttnPressMobile}
            style={{ opacity: gfCompleted ? "" : "0.6" }}
          >
            Reset
          </button>
        </div>
        <div className="mobilBttn">
          <img
            onClick={this.isMobileBttnPress}
            src={mobilBttn}
            alt=""
            style={{ display: displayBttn ? "flex" : "none" }}
          />
        </div>
        <div onClick={this.develop}>Development</div>
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
  displayMobileBttn,
  isResetBttn,
  isGraphCompleted
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
