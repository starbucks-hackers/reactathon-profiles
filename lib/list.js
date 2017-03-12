'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (table, callback, userId) => {

  var allowedTables = utils.allowedTables;

  //debug table logs
  console.log(table);
  console.log(allowedTables[table]);

  if(!(table in allowedTables)){
    console.error("Table doesn't exist.");
    callback(new Error("Table doesn't exist."));
    return;
  }

  const params = {
    TableName: allowedTables[table],
  };

  if(table == 'children'){
    params.Key = {"userId": userId}
    params.KeyConditionExpression = "userId = :userId";
    params.ExpressionAttributeValues = {
        ":userId":userId
    };
  }

  // fetch all todos from the database
  dynamoDb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the Providers.'));
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