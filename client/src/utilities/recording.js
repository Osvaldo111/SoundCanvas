var ARRAY_OF_AMPLITUD = [];

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

  return ARRAY_OF_AMPLITUD;
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
    // Take the first two values greater then 100 'frequency'
    if (index < 2 && val >= 90) {
      counterInArray++;
      return val;
    }
  });

  // Function reduce the array to a value
  // Here, all the elements get added to the first
  // element which acted as the accumulator initially.
  let Sum = counterArray.reduce((acum, val) => acum + val);

  var averageMean = Sum / counterInArray;
  return averageMean;
}

/**
 * This function returns the input received into a  range of 0-100.
 * The function takes the integer 255 as the maximum value that
 * can be received by the frequency, thou is considered as the 100%.
 * And the 90 frequency as the 0 percent.
 * @param {int} num
 * https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData
 */
function amplitudToOneHundred(num) {
  const minValue = 90; // Represents 0 percent
  const maxValue = 255; // Represents 100 percent
  return Math.round(((num - minValue) / (maxValue - minValue)) * 100);
  // return Math.round((num / 255) * 100);
}

module.exports = {
  //   record: processAudio,
  getFrequencyData: getFrequencyData
};
