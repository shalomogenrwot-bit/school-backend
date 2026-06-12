const { Pool } = require('pg');

const pool = new Pool(
  process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'school_db',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
      }
);

pool.on('connect', () => console.log('📦 Connected to PostgreSQL'));
pool.on('error', (err) => console.error('❌ Database error:', err));

const query = async (text, params) => {
  const result = await pool.query(text, params);
  return result;
};

module.exports = { pool, query };

