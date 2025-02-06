import { Pool } from 'pg';

const db = new Pool({
  connectionString: 'postgres://user:password@localhost:5432/mydb',
});

export const connectToDatabase = async () => {
  try {
    await db.query('SELECT NOW()');
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
};

export default db;