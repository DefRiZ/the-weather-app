import "./App.css";
import CurrentWeather from "./components/CurrentWeather";
import WeatherSearch from "./components/WeatherSearch";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="font-bold text-gray-800 mb-6 sm:text-xl md:text-4xl">
        Додаток для пошуку погоди
      </h1>
      <CurrentWeather />
      <WeatherSearch />
    </div>
  );
}

export default App;
