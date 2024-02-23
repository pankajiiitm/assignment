import express from "express";
import { getCompanies} from "../controllers/getCompanies.js";
import {priceConversion} from "../controllers/priceConversion.js"
import {getAllCurrencies} from "../controllers/getAllcurrencies.js"
var router = express.Router();



// Endpoint to fetch cryptocurrency information
router.get('/getallcryptocurrencies', getAllCurrencies);

router.get("/getallcompanies",getCompanies)

router.post("/getprice", priceConversion);

export default router;