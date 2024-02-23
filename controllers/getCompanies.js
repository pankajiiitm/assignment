import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

export const  getCompanies = async (req, res) => {
    const { currency } = req.query;
    try {
      const response = await axios.get(`${process.env.COINGECKO_API_URL}/companies/public_treasury/${currency}`);
      const companies = response.data.companies.map(company => company.name);
      res.json({ companies });
    } catch (error) {
      console.error('Error fetching companies:', error);
      res.status(500).json({ error: 'Failed to fetch companies' });
    }
 }