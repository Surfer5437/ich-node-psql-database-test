/** Database setup for ich_test. */

const { Client } = require("pg");


const db = new Client({
  host: 'localhost',
  user: 'livin',
  port:5432,
  password: 'rootUser',
  database:'ich_test'
});


db.connect();

module.exports = db;
