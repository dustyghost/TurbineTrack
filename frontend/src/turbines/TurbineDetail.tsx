import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTurbine, Turbine } from '../api/turbineAPI';

const TurbineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [turbine, setTurbine] = useState<Turbine | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTurbine(id!);
        setTurbine(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (!turbine) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white shadow-md rounded-xl p-6 space-y-3">
        <h1 className="text-2xl font-semibold">Turbine at {turbine.location}</h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Status:</strong> {turbine.status}</p>
          <p><strong>Power Output:</strong> {turbine.powerOutput} kW</p>
          <p><strong>Wind Speed:</strong> {turbine.windSpeed} m/s</p>
          <p><strong>Country:</strong> {turbine.country} </p>
          <p><strong>Area:</strong> {turbine.area} </p>
        </div>
      </div>
    </div>
  );
};

export default TurbineDetail;
