var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/hurryup.sqlite')
  }
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id');
      user.string('username', 20);
      user.string('password', 20);
      user.integer('phoneNumber', 10);
    }).then(function(table) {
      console.log('Created User Table', table);
    });
  }
});

db.knex.schema.hasTable('events').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('events', function(event) {
      event.increments('id');
      event.string('eventName', 20);
      event.string('eventTime', 20);
      event.string('eventLocation', 20);
      event.integer('arrivalMargin', 3);
      event.string('transportMode', 3);
    }).then(function(table) {
      console.log('Created Event Table', table);
    });
  }
});

module.exports = db;
