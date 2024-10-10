import React, { useEffect, useState } from "react";
import axios from "axios";
import { getWeatherIcon } from "../functions/getWeatherIcon";
import { motion } from "framer-motion";

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const apiKey = "5658f434a9b20690c28744b8b0e9c05d";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError("Не вдалося отримати дані о погоді.");
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setError("Не вдалося отримати дані о погоді.");
      }
    );
  }, []);

  const weatherIcon = getWeatherIcon(weatherData?.weather[0].description);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg mobile:p-2 mobile:w-[300px] sm:p-4 sm:w-[400px] mx-auto mt-8 md:p-6 md:w-[500px]"
    >
      {error && <p className="text-red-400">{error}</p>}
      {weatherData ? (
        <div>
          <h2 className="mobile:text-xl md:text-2xl font-bold mb-2">
            Погода у вашій локації
          </h2>
          <p className="text-lg">Температура: {weatherData.main.temp}°C</p>
          <p className="text-lg capitalize flex items-center">
            Погода: {weatherData.weather[0].description}
            {weatherIcon}
          </p>
          <p className="text-lg">Вітер: {weatherData.wind.speed} м/с</p>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </motion.div>
  );
};

export default CurrentWeather;
