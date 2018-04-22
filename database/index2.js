const pg = require('pg');

let connection = {
  host: 'localhost',
  port: 3000,
  database: 'devPortal',
  user: '',
  password: ''
}

let pool = new pg.Pool(connection);