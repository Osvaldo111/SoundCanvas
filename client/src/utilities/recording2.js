const TIME_TO_RECORD = 5; // seconds
var ARRAY_OF_AMPLITUD = [];
var IS_TIME_COMPLETED = false;

/**
 * This function is designed to check and as for permission
 * to record the audio from the user. This implemets the
 * getUserMedia method from the Media devices to received the
 * MediaStream object which consists of several audio tracks.
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
 */
const processAudio = () => {
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
      .then(function(stream) {
        // Store the audio
        let chunks = [];
        const mediaRecorder = new MediaRecorder(stream);
        startRecording(mediaRecorder);

        // // Connection to Visualize the Data.
        connectionToStreamSource(stream);

        // This stop the recording, although it does not
        // stop the stream source.
        var counterStopRecording = 0;
        var timeLeft = 30;

        var timeToStopRecording = setInterval(function() {
          timeLeft--;
          counterStopRecording++;
          console.log("Time: ", counterStopRecording);
          if (counterStopRecording === TIME_TO_RECORD) {
            IS_TIME_COMPLETED = true;
            stopRecording(mediaRecorder);
            clearInterval(timeToStopRecording);
          }
        }, 1000);

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
 * Begin recording the media
 * @param {Object} mediaRecorder
 */
const startRecording = mediaRecorder => {
  mediaRecorder.start();
  console.log(mediaRecorder.state);
  console.log("recorder started");
};

/**
 * Stop recording the media
 * @param {Object} mediaRecorder
 */
function stopRecording(mediaRecorder) {
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
  console.log("recorder stopped");
}

/**
 * This function is designed to connect the stream to the AudioContext
 * and the AnalyserNode to get the frequency data. This function sets the
 * Audio Context interface that represents an audio-proccesing graph build
 * from audio modules.
 * This interface uses the createMediaStreamSource method to create a
 * MediaElementAudioSourceNode from which the audio can be manipulated.
 * The AnalyserNode interface represents a node that provides real-time
 * frequency and time-domain analysis information.
 * This function receives a MediaStream object that is return by the
 * getUserMedia method from the MediaDevices interface.
 * https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
 * https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 * @param {MediaStream} stream
 */
const connectionToStreamSource = stream => {
  // Setting the Audio Context parameters
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

  var counterOfInterval = 0;
  var myInterval = setInterval(function() {
    counterOfInterval++;
    getFrequencyData(analyser, dataArray);
    if (counterOfInterval === TIME_TO_RECORD) clearInterval(myInterval);
  }, 1000);
};

/**
 * This function is designed to get the current
 * frequency trhough the method getByteFrequencyData
 * of the AnalyserNode interface. The friquency data is
 * composed of integers between the range 0-255.
 * @param {BaseAudioContext} analyser
 * @param {Array} dataArray
 * https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext
 * https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData
 */
function getFrequencyData(analyser, dataArray) {
  analyser.getByteFrequencyData(dataArray);
  let soundAmplitud = calculateTheSoundAmplitud(dataArray);
  let hundredSoundAmplitued = amplitudToOneHundred(soundAmplitud);
  ARRAY_OF_AMPLITUD.push(hundredSoundAmplitued);
  console.log("The Frequency: ", ARRAY_OF_AMPLITUD);
}

/**
 * This function calculates the sound amplitud
 * according to the data provided by the method
 * getByteFrequencyData which copies the current
 * frequency data into the array provided as a parameter
 * in this function. This function only takes the first two
 * values of the array to determine the average of the
 * amplitud.
 * @param {Array} arr
 */
function calculateTheSoundAmplitud(arr) {
  // Conver the array to a 16-bit to
  // allow storage
  var dataArray = new Uint16Array(arr);

  let counterInArray = 0;
  let counterArray = dataArray.map((val, index) => {
    if (index < 2) {
      counterInArray++;
      return val;
    }
  });

  // Function reduce the array to a value
  // Here, all the elements gets added to the first
  // element which acted as the accumulator initially.
  let Sum = counterArray.reduce((acum, val) => acum + val);
  // console.log("***** Square: ", Squares);
  // console.log("***** Toal Sum: ", Sum);
  // console.log("***** Medium: ", Sum / counterInArray);

  var averageMean = Sum / counterInArray;
  return averageMean;
}

/**
 * This function returns the input received into a  range of 0-100.
 * The function takes the integer 255 as the maximum value that
 * can be received by the frequency, thou is considered as the 100%
 * @param {int} num
 * https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData
 */
function amplitudToOneHundred(num) {
  return Math.round((num / 255) * 100);
}

export default processAudio;
