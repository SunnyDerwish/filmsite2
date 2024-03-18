// Example: lib/db.js

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure this is set in your .env file
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
