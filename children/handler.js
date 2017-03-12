'use strict';

const create = require('../lib/create');
const get = require('../lib/get');
const list = require('../lib/list');
const deleteProvider = require('../lib/delete');

const table = 'children'

module.exports.get = (event, context, callback) => {
  var userId = event.pathParameters.id;
  get.get(table, userId, callback);
}
module.exports.list = (event, context, callback) => {
  var userId = event.pathParameters.id;
  list.list(table, callback, userId);
}
module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);
  create.create(table, data, callback);
}
module.exports.delete = (event, context, callback) => {
  const data = JSON.parse(event.body);
  deleteProvider.delete(table, data.id, callback);
}