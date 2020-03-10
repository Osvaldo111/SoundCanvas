// SQL connection
var pgConnection = require("../server/database/index");

const queryInsertEmails = (tableName, email, callback) => {
  const text = "INSERT INTO " + tableName + "(email) VALUES($1)";
  const values = [email];

  pgConnection.query(text, values, (err, res) => {
    if (err) {
      callback(err, res);
    } else {
      callback(null, res);
    }
  });
};

module.exports = {
  queryInsertEmails: queryInsertEmails
};
