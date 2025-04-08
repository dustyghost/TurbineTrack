import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTurbine, TurbineCreate } from '../api/turbineAPI';

const TurbineForm: React.FC = () => {
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Operational');
  const [powerOutput, setPowerOutput] = useState<number | ''>('');
  const [windSpeed, setWindSpeed] = useState<number | ''>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTurbine: TurbineCreate = {
      location,
      status,
      powerOutput: Number(powerOutput),
      windSpeed: Number(windSpeed)
    };

    try {
      await createTurbine(newTurbine);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
    <h1 className="text-xl font-semibold mb-4">Add New Turbine</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Location:</label>
        <input
          className="w-full border rounded px-3 py-2 bg-white focus:ring"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Status:</label>
        <select
          className="w-full border rounded px-3 py-2 bg-white focus:ring"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Operational">Operational</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Faulty">Faulty</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Power Output (kW):</label>
        <input
          className="w-full border rounded px-3 py-2 bg-white focus:ring"
          type="number"
          value={powerOutput}
          onChange={(e) => setPowerOutput(e.target.value === '' ? '' : Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Wind Speed (m/s):</label>
        <input
          className="w-full border rounded px-3 py-2 bg-white focus:ring"
          type="number"
          value={windSpeed}
          onChange={(e) => setWindSpeed(e.target.value === '' ? '' : Number(e.target.value))}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Turbine
      </button>
    </form>
  </div>
);
};

export default TurbineForm;
