import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createTurbine,
  updateTurbine,
  getTurbine,
  getCountries,
  getAreas,
} from '../api/turbineAPI';
import { Area, Country, Turbine, TurbineCreate } from '../types/models';

const TurbineForm: React.FC = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Operational');
  const [powerOutput, setPowerOutput] = useState<number | ''>('');
  const [windSpeed, setWindSpeed] = useState<number | ''>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | ''>('');
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState<number | ''>('');

  const navigate = useNavigate();

  // Fetch countries, areas and optionally existing turbine
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const [countryData, areaData] = await Promise.all([
          getCountries(),
          getAreas(),
        ]);
        setCountries(countryData);
        setAreas(areaData);

        if (isEditMode && id) {
          const turbine: Turbine = await getTurbine(Number(id));
          setLocation(turbine.location);
          setStatus(turbine.status);
          setPowerOutput(turbine.powerOutput);
          setWindSpeed(turbine.windSpeed);
          setSelectedCountryId(turbine.area?.countryId ?? '');
          setSelectedAreaId(turbine.areaId);
        }
      } catch (error) {
        console.error('Error loading form data', error);
      }
    };

    fetchFormData();
  }, [id, isEditMode]);

  // Filter areas when country changes
  useEffect(() => {
    if (selectedCountryId === '') {
      setFilteredAreas([]);
      setSelectedAreaId('');
      return;
    }

    const filtered = areas.filter(
      (a) => a.countryId === Number(selectedCountryId)
    );
    setFilteredAreas(filtered);

    // If editing, preserve selectedAreaId if still valid
    if (
      isEditMode &&
      filtered.some((a) => a.id === Number(selectedAreaId))
    ) {
      return;
    }

    setSelectedAreaId('');
  }, [selectedCountryId, areas, selectedAreaId, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAreaId) {
      alert('Please select an area.');
      return;
    }

    try {
      if (isEditMode && id) {
        const turbine: Turbine = {
          id: Number(id),
          location,
          status,
          powerOutput: Number(powerOutput),
          windSpeed: Number(windSpeed),
          areaId: Number(selectedAreaId),
        };
        await updateTurbine(turbine.id, turbine);
      } else {
        const newTurbine: TurbineCreate = {
          location,
          status,
          powerOutput: Number(powerOutput),
          windSpeed: Number(windSpeed),
          areaId: Number(selectedAreaId),
        };
        await createTurbine(newTurbine);
      }
      navigate('/turbines');
    } catch (error) {
      console.error('Failed to save turbine', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h1 className="text-xl font-semibold mb-4">
        {isEditMode ? 'Edit Turbine' : 'Add New Turbine'}
      </h1>
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
            onChange={(e) =>
              setPowerOutput(e.target.value === '' ? '' : Number(e.target.value))
            }
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Wind Speed (m/s):</label>
          <input
            className="w-full border rounded px-3 py-2 bg-white focus:ring"
            type="number"
            value={windSpeed}
            onChange={(e) =>
              setWindSpeed(e.target.value === '' ? '' : Number(e.target.value))
            }
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Country:</label>
          <select
            className="w-full border rounded px-3 py-2 bg-white focus:ring"
            value={selectedCountryId}
            onChange={(e) => setSelectedCountryId(Number(e.target.value))}
            required
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Area:</label>
          <select
            className="w-full border rounded px-3 py-2 bg-white focus:ring"
            value={selectedAreaId}
            onChange={(e) => setSelectedAreaId(Number(e.target.value))}
            disabled={!selectedCountryId}
            required
          >
            <option value="">Select an area</option>
            {filteredAreas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEditMode ? 'Update Turbine' : 'Add Turbine'}
        </button>
      </form>
    </div>
  );
};

export default TurbineForm;
