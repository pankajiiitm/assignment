import mongoose from "mongoose"

// CryptoCurrency Schema
const CryptoCurrencySchema = new mongoose.Schema({
    id: String,
    name: String,
});

export default mongoose.model("CryptoCurrency", CryptoCurrencySchema)