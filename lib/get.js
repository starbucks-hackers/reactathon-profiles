'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils')

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (table, userId, callback) => {

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
    Key: {
      id: userId,
    },
  };

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      consolse.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
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