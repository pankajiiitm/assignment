import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


export const getAllCurrencies = async (req, res) => {
    try {
      const response = await axios.get(`${process.env.COINGECKO_API_URL}/coins/list`);
      const cryptocurrencies = response.data.map(currency => ({
        id: currency.id,
        name: currency.name
      }));
      res.json(cryptocurrencies);
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
      res.status(500).json({ error: 'Failed to fetch cryptocurrencies' });
    }
  }