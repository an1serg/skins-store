import express from 'express';
import { connectToDatabase } from './db';
import { connectToRedis } from './redis';
import routes from './routes';

const app = express();
app.use(express.json());

connectToDatabase();
connectToRedis();

app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});