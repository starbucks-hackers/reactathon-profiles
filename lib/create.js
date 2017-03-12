'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (table, data, callback) => {
  const timestamp = new Date().getTime();
  var allowedTables = utils.allowedTables;

  //debug table logs
  console.log(table);
  console.log(allowedTables[table]);

  if(!(table in allowedTables)){
    console.error('Table doesn\'t exist.');
    callback(new Error('Table doesn\'t exist.'));
    return;
  }

  const params = utils.createParams(table, data);

  //DEBUG params log
  console.log(params);

  // write the todo to the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};