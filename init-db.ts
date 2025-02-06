import { Pool } from 'pg';

const db = new Pool({
  connectionString: 'postgres://user:password@localhost:5432/mydb',
});

const initDatabase = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        balance FLOAT DEFAULT 100.0
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        price FLOAT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS purchases (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        price FLOAT NOT NULL,
        purchased_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.query(`
      INSERT INTO products (name, price)
      VALUES 
        ('Product A', 10.5),
        ('Product B', 20.0),
        ('Product C', 15.75)
      ON CONFLICT (name) DO NOTHING;
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await db.end();
  }
};

initDatabase();