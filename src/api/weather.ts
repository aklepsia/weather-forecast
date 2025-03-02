import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface WeatherAPIResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}

interface WeatherData {
  time: string;
  temp: number;
  humidity: number;
  pressure: number;
  wind: number;
  description: string;
}

export const fetchWeather = async (city: string): Promise<WeatherData[]> => {
  const geo = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}&lang=ru`
  );
  if (geo.data.length === 0) throw new Error("Город не найден");

  const { lat, lon } = geo.data[0];

  const weatherRes = await axios.get<WeatherAPIResponse>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=ru`
  );

  return weatherRes.data.list.map((obj) => ({
    time: obj.dt_txt,
    temp: obj.main.temp,
    humidity: obj.main.humidity,
    pressure: obj.main.pressure,
    wind: obj.wind.speed,
    description: obj.weather[0].description,
  }));
};
