import axios from 'axios';
import redis from '../redis';

export const getItems = async () => {
  try {
    const cache = await redis.get('skinport_items');
    if (cache) return JSON.parse(cache);

    const { data } = await axios.get('https://api.skinport.com/v1/items', {
      params: { app_id: 'default', currency: 'USD' },
    });

    const items = data.map((item: any) => ({
      name: item.market_hash_name,
      tradable: item.min_price,
      not_tradable: item.min_price_untradable,
    })).slice(0, 10);

    await redis.set('skinport_items', JSON.stringify(items), 'EX', 300);
    return items;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw new Error('Failed to fetch items');
  }
};