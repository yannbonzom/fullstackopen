import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res);
        setWeather(res.data);
      });
  }, [capital]);

  if (weather)
    return (
      <>
        <h2>Weather in {capital}</h2>
        <p>temperature {Math.round(weather.main.temp - 273.15)} Celsius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        ></img>
        <p>wind {weather.wind.speed} m/s</p>
      </>
    );
};

export default Weather;
