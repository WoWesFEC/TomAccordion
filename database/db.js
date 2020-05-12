const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect();

const getAllItemInfo = function(productId, callback) {
  connection.query(`SELECT * FROM items WHERE id=${productId}`, function (error, results, fields) {
    if (error) {
      callback(error, null);
    }
    callback(null, results);
  });
}

module.exports = {
  getAllItemInfo
};