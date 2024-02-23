
import express, { json } from "express";
import { config } from "dotenv";
import  koinxRoute  from "./routes/allRoutes.js"
import CryptoCurrency from "./models/CryptoCurrency.js"; 
import cron from "node-cron"; // Import cron module
import axios from 'axios';
import { connectDB } from "./db/db.js";
config();

// Sample user data
let PORT = process.env.PORT
const app = express()
app.use(express.json());
app.use(koinxRoute)

connectDB()

// Background job to update cryptocurrencies every hour
cron.schedule('0 * * * *', async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const currencies = response.data.map(currency => ({
            id: currency.id,
            name: currency.name,
        }));
        await CryptoCurrency.deleteMany({});
        await CryptoCurrency.insertMany(currencies);
        console.log('Cryptocurrencies updated successfully');
    } catch (error) {
        console.error('Error updating cryptocurrencies:', error);
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


