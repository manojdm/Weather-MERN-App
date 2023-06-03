import axios from "axios";
import express from "express";

const router = express.Router();


router.route('/').post(async (req,res) => {

    //location
    const location = req.body?.location;

    //apikey
    const apiKey = "84836903c1ef4a98a3641416230306";

    //result
    const result = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`);
    
    //sending result
    res.json(result.data)
})

export default router;