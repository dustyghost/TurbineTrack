import React, { useEffect, useState } from 'react';
import { getTurbines, Turbine } from '../api/turbineAPI';
import { Link } from 'react-router-dom';

const TurbineList: React.FC = () => {
  const [turbines, setTurbines] = useState<Turbine[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTurbines();
        setTurbines(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

return (
  <div className="max-w-xl mx-auto mt-10">
    <h1 className="text-2xl font-semibold mb-4">Turbine List</h1>
    <ul className="bg-white shadow-md rounded-xl divide-y divide-gray-200">
      {turbines.map((turbine) => (
        <li key={turbine.id} className="px-4 py-3 hover:bg-gray-50">
          <Link className="text-blue-500 hover:underline" to={`/turbines/${turbine.id}`}>
            {turbine.location} — <span className="font-medium">{turbine.status}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
};

export default TurbineList;
