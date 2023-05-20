const Pool = require('pg').Pool;

const pool = new Pool ({
  user:"user",
  host: "172.31.0.7",
  database:"sdc_reviews",
  password: "password",
  port: 5432,
});

module.exports = pool;