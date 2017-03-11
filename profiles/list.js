'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {

  var table = event.pathParameters.table;
  var allowedTables = utils.allowedTables;

  //debug table logs
  console.log(table);
  console.log(allowedTables[table]);

  if(!(table in allowedTables)){
    console.error("Table doesn't exist.");
    callback(new Error("Table doesn't exist."));
    return;
  }

  if(table == 'users'){
    response = {
      statusCode: 403,
      body: 'Not allowed to return all users'
    }
  }

  const params = {
    TableName: allowedTables[table],
  };

  if(table == 'children'){
    params.Key.user = data.user;
  }

  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the todos.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};