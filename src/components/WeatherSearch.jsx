import React, { useState } from "react";
import axios from "axios";
import { getWeatherIcon } from "../functions/getWeatherIcon";
import { motion } from "framer-motion";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = async () => {
    try {
      const apiKey = "5658f434a9b20690c28744b8b0e9c05d";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError(null);
      setCity("");
    } catch (err) {
      setError("Місто не знайдено.");
      setWeatherData(null);
      setCity("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") fetchWeatherByCity();
  };

  const weatherIcon = getWeatherIcon(weatherData?.weather[0].description);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white shadow-lg rounded-lg mobile:p-2 mobile:w-[300px] sm:p-4 sm:w-[400px] md:p-6 md:w-[500px] mx-auto mt-8 "
    >
      <form onSubmit={handleSearch} className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Введіть місто"
          value={city}
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Знайти
        </button>
      </form>
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {weatherData && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold mt-4">
            Погода в {weatherData.name}
          </h2>
          <p className="text-lg">Температура: {weatherData.main.temp}°C</p>
          <p className="text-lg capitalize flex items-center">
            Погода: {weatherData.weather[0].description} {weatherIcon}
          </p>
          <p className="text-lg">Вітер: {weatherData.wind.speed} м/с</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherSearch;
