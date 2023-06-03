import express from "express";
import weather from "./api/weather.js"
import cors from "cors"

const app = express();

//cors
app.use(cors())

//routes & middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api/weather', weather)

const PORT = process.env.PORT || 5500

//starting on port 5500
app.listen(PORT, () => {
    console.log(`backend running on port ${PORT}`);
})