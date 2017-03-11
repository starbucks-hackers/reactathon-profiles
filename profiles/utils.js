'use strict';

const uuid = require('uuid');

module.exports.allowedTables = {
  'users': process.env.USER_TABLE,
  'providers': process.env.PROVIDER_TABLE,
  'children': process.env.CHILDREN_TABLE
}

module.exports.createParams = (table, data) => {

  const timestamp = new Date().getTime();
  params = {
    TableName = allowedTables[table],
    Item : {
      id: uuid.v1(),
      firstName: data.firstName,
      lastName: data.lastNameName,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
  }
  if(table == 'children'){
    params.Item.allergies = data.allergies;
    params.Item.dietaryRestrictions = data.dietaryRestrictions;
    params.Item.healthConcerns = data.healthConcerns;
    params.Item.age = data.age;
    params.Item.gender = data.gender;
    params.Item.other = data.other;
  }else {
    params.Item.email = data.email;
    params.Item.phone = data.phone;
    params.Item.address = data.address;
    params.Item.image = data.image;
    params.Item.password = data.password;
    if(table == 'providers'){
      params.Item.certificates = data.certificates;
      params.Item.specialties = data.specialties;
      params.Item.experience = data.experience;
      params.Item.range = data.range;
    }
  }
  return params;
}


