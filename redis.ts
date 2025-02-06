import Redis from 'ioredis';

const redis = new Redis();

export const connectToRedis = () => {
  console.log('Connected to Redis');
};

export default redis;