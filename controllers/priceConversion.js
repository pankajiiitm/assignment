import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const COINGECKO_API_URL = process.env.COINGECKO_API_URL
export const priceConversion = async (req, res) => {
    const { fromCurrency, toCurrency, date } = req.body;

    if (!fromCurrency || !toCurrency || !date) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const toCurrencySymble = await getToCurrencySymble(toCurrency)
        if (!fromCurrency || !toCurrency) {
            return res.status(400).json({ error: "Invalid currency names" });
        }
        // price of both currency at given date but currently i am not using toResponce ( prices of toCurrency)
        const [fromResponse, toResponse] = await Promise.all([
            axios.get(`${COINGECKO_API_URL}/coins/${fromCurrency}/history`, {
                params: { date }
            }),
            axios.get(`${COINGECKO_API_URL}/coins/${toCurrency}/history`, {
                params: { date }
            })
        ]);

        // Extract price information from historicalData
        const priceOfFromCurrenciesIntoCurrency = fromResponse.data.market_data.current_price[toCurrencySymble]

        return res.status(200).json({ price: priceOfFromCurrenciesIntoCurrency });
    } catch (error) {
        console.error("Error fetching currency price:", error);
        return res.status(500).json({ error: "Failed to fetch currency price" });
    }
}

// funtion to fetch currency symble

async function getToCurrencySymble(currencyName) {
    try {
        const response = await axios.get(`${COINGECKO_API_URL}/coins/list`);
        const coinList = response.data;
        const currency = coinList.find(coin => coin.id.toLowerCase() === currencyName.toLowerCase());
        return currency ? currency.symbol : null;
    } catch (error) {
        console.error("Error fetching currency ID:", error);
        return null;
    }
}