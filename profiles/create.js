'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the todo item.'));
    return;
  }

  var table = event.pathParameters.table;
  var allowedTables = utils.allowedTables;

  //debug table logs
  console.debug(table);
  console.debug(allowedTables[table]);

  if(!(table in allowedTables)){
    console.error("Table doesn't exist.");
    callback(new Error("Table doesn't exist."));
    return;
  }

  const params = utils.createParams(table, data);

  //DEBUG params log
  console.debug(params);

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