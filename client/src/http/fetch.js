import axios from "axios";

/**
 * @author Osvaldo Carrillo
 * This function is designed to fetch
 * an API
 * @param {String} http
 * @param {Object} data
 */
const fetchAPI = (http, data) => {
  alert();
  axios
    .post(http, {
      data: data
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default fetchAPI;
