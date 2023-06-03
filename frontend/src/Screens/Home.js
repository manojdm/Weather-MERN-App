import React, { useRef } from 'react'
import { useState } from 'react'
import "../styles/index.css"
import image from "../images/weather.png"
import axios from 'axios'

const Home = () => {

    const [location, setLocation] = useState("")
    const locationRef = useRef(null)
    const temperatureRef = useRef(null)
    const humidityRef = useRef(null)
    const windRef = useRef(null)
    const statusRef = useRef(null)

    const handleForm = async (e) => {
        e.preventDefault()

        try {

            const res = await axios.post("http://localhost:5500/api/weather", {
                location: location
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            const data = await res.data;
    
            //reports
            const locationValue = `${data?.location?.name}, ${data?.location?.region}, ${data?.location?.country}`;
            const temperature = data?.current?.temp_c;
            const humidity = data?.current?.humidity;
            const wind = data?.current?.wind_kph;
            const status = data?.current?.condition?.text;
    
            //setting values
            locationRef.current.innerHTML = locationValue;
            temperatureRef.current.innerHTML = temperature;
            humidityRef.current.innerHTML = humidity;
            windRef.current.innerHTML = wind;
            statusRef.current.innerHTML = status;

        } catch(e) {

            console.log(e.message);
            window.alert("Please enter a valid location and try again.")
        }


    }

  return (
    <>
    <img src={image} alt="Weather image" className="weather" />
    <div className="container">
        <div className="weather-report-container">
            <div className="weather-report-header">
                <div className="location" ref={locationRef}>
                    Location
                </div>
                <div className="weather-status" ref={statusRef}>
                    Weather Status
                </div>
            </div>
            <div className="weather-report-form">
                <form onSubmit={(e) => handleForm(e)}>
                    <div className="form-div location">
                        <label for="location">Location</label>
                        <input onChange={(e) => setLocation(e.target.value)} type="text" name="location" id="location" placeholder="Enter Location" />
                    </div>
                    <div className="form-div submit">
                        <input type="submit" value="Get Weather" />
                    </div>
                </form>
            </div>
            <div className="weather-results">
                <div className="weather-stats">
                    <div className="stat temperature">Temperature: <span className="number" ref={temperatureRef}>0</span>&nbsp;℃</div>
                    <div className="stat humidity">Humidity: <span className="number" ref={humidityRef}>0</span></div>
                    <div className="stat wind">wind: <span className="number" ref={windRef}>0</span>&nbsp;kmph</div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home