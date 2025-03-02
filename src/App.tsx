import React from "react";
import { fetchWeather } from "./api/weather";
import WeatherChart from "./components/WeatherChart";

interface WeatherData {
  time: string;
  temp: number;
  humidity: number;
  pressure: number;
  wind: number;
  description: string;
}

const App: React.FC = () => {
  const [city, setCity] = React.useState<string>("");
  const [data, setData] = React.useState<WeatherData[]>([]);
  const [dataType, setDataType] = React.useState<keyof WeatherData>("temp");

  const getWeather = async () => {
    try {
      const weatherData = await fetchWeather(city);
      setData(weatherData);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      alert("Ошибка: город не найден!");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getWeather();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-white"></div>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => (e.currentTarget.style.display = "none")}
      >
        <source
          src={`${import.meta.env.BASE_URL}clouds.mp4`}
          type="video/mp4"
        />
      </video>
      <div className="relative bg-gray-900 opacity-80 p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl text-white font-semibold text-center mb-4 uppercase">
          Прогноз погоды 🌤️
        </h1>
        <div className="flex gap-2">
          <input
            className="border border-gray-300 p-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите город"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all shadow-md"
            onClick={getWeather}
          >
            🔍
          </button>
        </div>
        <div className="flex gap-2 my-4 justify-center">
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              dataType === "temp"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            onClick={() => setDataType("temp")}
          >
            🌡 Температура
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              dataType === "humidity"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            onClick={() => setDataType("humidity")}
          >
            💧 Влажность
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              dataType === "pressure"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            onClick={() => setDataType("pressure")}
          >
            🎈 Давление
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              dataType === "wind"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            onClick={() => setDataType("wind")}
          >
            💨 Ветер
          </button>
        </div>
        {data.length > 0 && <WeatherChart data={data} dataType={dataType} />}
      </div>
    </div>
  );
};

export default App;
