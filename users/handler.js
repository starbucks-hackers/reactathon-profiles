'use strict';

const create = require('../lib/create');
const get = require('../lib/get');
const list = require('../lib/list');
const deleteProvider = require('../lib/delete');

const table = 'users'

module.exports.get = (event, context, callback) => {
  var userId = event.pathParameters.id;
  get.get(table, userId, callback);
}
module.exports.list = (event, context, callback) => {
  list.list(table,callback);
}
module.exports.create = (event, context, callback) => {
  const data = JSON.parse(event.body);
  create.create(table, data, callback);
}
module.exports.delete = (event, context, callback) => {
  const data = JSON.parse(event.body);
  deleteProvider.delete(table, data.id, callback);
}