import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getTurbine, deleteTurbine } from '../api/turbineAPI';
import { Turbine } from '../types/models';

import toast from 'react-hot-toast';

const TurbineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [turbine, setTurbine] = useState<Turbine | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTurbine(Number(id));
        setTurbine(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this turbine?')) return;
    try {
      await deleteTurbine(Number(id));
      toast.success('Turbine deleted successfully');
      navigate('/turbines');
    } catch (error) {
      toast.error('Failed to delete turbine');
      console.error(error);
    }
  };

  if (!turbine) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <div className="bg-white shadow-md rounded-xl p-6 space-y-3">
        <h1 className="text-2xl font-semibold">Turbine at {turbine.location}</h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Status:</strong> {turbine.status}</p>
          <p><strong>Power Output:</strong> {turbine.powerOutput} kW</p>
          <p><strong>Wind Speed:</strong> {turbine.windSpeed} m/s</p>
          <p><strong>Country:</strong> {turbine.area?.country?.name}</p>
          <p><strong>Area:</strong> {turbine.area?.name}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <Link
          to={`/turbines/${turbine.id}/edit`}
          className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TurbineDetail;
