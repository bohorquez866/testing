const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Content-Type': 'application/json'
};

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
});

module.exports.addToWatchlist = async (event) => {
  try {
    const { symbol, companyName, notes } = JSON.parse(event.body);
    await pool.query(
      'INSERT INTO watchlist(user_id, symbol, company_name, notes) VALUES($1, $2, $3, $4)',
      [1, symbol, companyName, notes]
    );
    return { statusCode: 201, headers, body: JSON.stringify({ message: 'Stock added' }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};

module.exports.getWatchlist = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM watchlist WHERE user_id = $1', [1]);
    return { statusCode: 200, headers, body: JSON.stringify(rows) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};

module.exports.removeFromWatchlist = async (event) => {
  try {
    const { symbol } = event.pathParameters;
    await pool.query('DELETE FROM watchlist WHERE user_id = $1 AND symbol = $2', [1, symbol]);
    return { statusCode: 200, headers, body: JSON.stringify({ message: 'Stock removed' }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};