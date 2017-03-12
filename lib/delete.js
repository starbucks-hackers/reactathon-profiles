'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (table, userId, callback) => {
  const params = {
    TableName: utils.allowedTables[table],
    Key: {
      id: userId,
    },
  };

  // delete the todo from the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t remove the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({}),
    };
    callback(null, response);
  });
};