import express from "express";
import weather from "./api/weather.js"

const app = express();

//routes & middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use('/api/weather', weather)

const PORT = process.env.PORT || 8800

//starting on port 5500
app.listen(PORT, () => {
    console.log(`backend running on port ${PORT}`);
})