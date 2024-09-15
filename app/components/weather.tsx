import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '9926c3d663dc502d4515c766575dca81'; // Reemplaza con tu API Key de OpenWeatherMap
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Monterrey,mx&units=metric&appid=${apiKey}`);
        setTemperature(response.data.main.temp);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener la temperatura');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <span className="text-lg mr-2">Cargando...</span>;
  }

  if (error) {
    return <span className="text-lg mr-2">{error}</span>;
  }

  return <>{temperature}</>;
};

export default Weather;