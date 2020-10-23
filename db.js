const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "MeganRussell13",
  host: "localhost",
  port: 5432,
  database: "notesapp"
});

module.exports = pool;