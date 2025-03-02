import React from "react";
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WeatherData {
  time: string;
  temp: number;
  humidity: number;
  pressure: number;
  wind: number;
  description: string;
}

interface WeatherChartProps {
  data: WeatherData[];
  dataType: keyof WeatherData;
}

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: { value: number; payload: WeatherData }[];
}> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { time, temp, humidity, pressure, wind, description } =
      payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow text-black">
        <p>{`Время: ${time}`}</p>
        <p>{`Температура: ${temp}°C`}</p>
        <p>{`Влажность: ${humidity}%`}</p>
        <p>{`Давление: ${pressure} hPa`}</p>
        <p>{`Ветер: ${wind} м/с`}</p>
        <p>{`Погода: ${description}`}</p>
      </div>
    );
  }
  return null;
};

const WeatherChart: React.FC<WeatherChartProps> = ({ data, dataType }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <YAxis stroke="white" />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey={dataType} stroke="rgb(59 130 246)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
