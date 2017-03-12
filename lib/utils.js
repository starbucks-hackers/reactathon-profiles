'use strict';

const allowedTables = {
  'users': process.env.USER_TABLE,
  'providers': process.env.PROVIDER_TABLE,
  'children': process.env.CHILDREN_TABLE
}

module.exports.allowedTables = allowedTables;

module.exports.createParams = (table, data) => {

  const timestamp = new Date().getTime();
  var params = {
    TableName: allowedTables[table],
    Item: {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
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
    params.Item.userId = data.userId;
  }else {
    params.Item.email = data.email;
    params.Item.phone = data.phone;
    params.Item.address = data.address;
    params.Item.image = data.image;
    params.Item.password = data.password;
    params.Item.notifications = data.notifications;
    if(table == 'providers'){
      params.Item.certifications = data.certifications;
      params.Item.specialSkills = data.specialSkills;
      params.Item.experience = data.experience;
      params.Item.rating = data.rating;
      params.Item.age = data.age;
      params.Item.bio = data.bio;
    }
  }
  return params;
}

/*module.exports.updateParams = (table, data) => {

  const timestamp = new Date().getTime();
  params = {
    TableName = allowedTables[table],
    Key: {
      id = data.id,
    },
    ExpressionAttributeValues: {
      ':firstName' : data.firstName,
      ':lastName': data.lastNameName,
      ':updatedAt': timestamp
    },
    ReturnValues: 'ALL_NEW',
  }
  if(table == 'children'){
    params.ExpressionAttributeValues[':allergies'] = data.allergies;
    params.ExpressionAttributeValues[':dietaryRestrictions'] = data.dietaryRestrictions;
    params.ExpressionAttributeValues[':healthConcerns'] = data.healthConcerns;
    params.ExpressionAttributeValues[':age'] = data.age;
    params.ExpressionAttributeValues[':gender'] = data.gender;
    params.ExpressionAttributeValues[':other'] = data.other;
    params.UpdateExpression = 'SET firstName = :firstName, \
                                  lastName = :lastName, \
                                  updatedAt = :updatedAt, \
                                  allergies = :allergies, \
                                  dietaryRestrictions = :dietaryRestrictions, \
                                  age = :age, \
                                  gender = :gender, \
                                  other = :other';
  }else {
    params.ExpressionAttributeValues[':email'] = data.email;
    params.ExpressionAttributeValues[':phone'] = data.phone;
    params.ExpressionAttributeValues[':address'] = data.address;
    params.ExpressionAttributeValues[':image'] = data.image;
    params.ExpressionAttributeValues[':password'] = data.password;
    if(table == 'providers'){
      params.ExpressionAttributeValues[':certificates'] = data.certificates;
      params.ExpressionAttributeValues[':specialties'] = data.specialties;
      params.ExpressionAttributeValues[':experience'] = data.experience;
      params.ExpressionAttributeValues[':range'] = data.range;
      params.UpdateExpression = 'SET firstName = :firstName, \
                                  lastName = :lastName, \
                                  updatedAt = :updatedAt, \
                                  email = :email, \
                                  phone = :phone, \
                                  address = :address, \
                                  certificates = :certificates, \
                                  specialties = :specialties, \
                                  experience = :experience, \
                                  range = :range';
    }else{
      params.UpdateExpression = 'SET firstName = :firstName, \
                                  lastName = :lastName, \
                                  updatedAt = :updatedAt, \
                                  email = :email, \
                                  phone = :phone, \
                                  address = :address';
    }
  }

  console.debug(params.UpdateExpression);

  return params;
}*/


