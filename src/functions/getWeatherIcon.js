import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplet,
} from "lucide-react";

export const getWeatherIcon = (weatherDescription) => {
  const description = weatherDescription?.toLowerCase();

  if (description?.includes("clear")) {
    return <Sun className="w-12 h-12 text-yellow-500" />;
  } else if (description?.includes("cloud")) {
    return <Cloud className="w-12 h-12 text-gray-500" />;
  } else if (description?.includes("rain")) {
    return <CloudRain className="w-12 h-12 text-blue-500" />;
  } else if (description?.includes("snow")) {
    return <CloudSnow className="w-12 h-12 text-blue-200" />;
  } else if (description?.includes("thunderstorm")) {
    return <CloudLightning className="w-12 h-12 text-yellow-600" />;
  } else if (description?.includes("wind")) {
    return <Wind className="w-12 h-12 text-gray-400" />;
  } else if (description?.includes("drizzle")) {
    return <Droplet className="w-12 h-12 text-blue-400" />;
  } else {
    return <Sun className="w-12 h-12 text-yellow-500" />; // Иконка по умолчанию
  }
};
