import React, { useEffect, useState } from 'react';
import { getTurbines } from '../api/turbineAPI';
import { Link } from 'react-router-dom';
import { Turbine } from '../types/models';
import Select from '../components/Select.tsx'

const TurbineList: React.FC = () => {
  const [turbines, setTurbines] = useState<Turbine[]>([]);
  const [filtered, setFiltered] = useState<Turbine[]>([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState<'location' | 'power'>('location');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTurbines();
        setTurbines(data);
        setFiltered(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...turbines];

    if (countryFilter) {
      result = result.filter(
        t => t.area?.country?.name?.toLowerCase() === countryFilter.toLowerCase()
      );
    }

    if (statusFilter) {
      result = result.filter(t => t.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (sortBy === 'location') {
      result.sort((a, b) => a.location.localeCompare(b.location));
    } else if (sortBy === 'power') {
      result.sort((a, b) => b.powerOutput - a.powerOutput);
    }

    setFiltered(result);
  }, [countryFilter, statusFilter, sortBy, turbines]);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-4">Turbine List</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Select label="Country" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
          <option value="">All Countries</option>
          <option value="UK">UK</option>
          <option value="Norway">Norway</option>
          <option value="Germany">Germany</option>
        </Select>

        <Select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Operational">Operational</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Faulty">Faulty</option>
        </Select>

        <Select
          label="Sort By"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'location' | 'power')}
        >
          <option value="location">Sort by Location</option>
          <option value="power">Sort by Power Output</option>
        </Select>
      </div>

      <table className="w-full bg-white shadow rounded-xl text-left text-sm">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th className="px-4 py-2">Location</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Country</th>
          <th className="px-4 py-2">Area</th>
          <th className="px-4 py-2">Power (kW)</th>
          <th className="px-4 py-2">Wind (m/s)</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((turbine) => (
          <tr key={turbine.id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2">
              <Link to={`/turbines/${turbine.id}`} className="text-blue-600 hover:underline">
                {turbine.location}
              </Link>
            </td>
            <td className="px-4 py-2">{turbine.status}</td>
            <td className="px-4 py-2">{turbine.area?.country?.name || '-'}</td>
            <td className="px-4 py-2">{turbine.area?.name || '-'}</td>
            <td className="px-4 py-2">{turbine.powerOutput.toFixed(1)}</td>
            <td className="px-4 py-2">{turbine.windSpeed.toFixed(1)}</td>
          </tr>
        ))}
        {filtered.length === 0 && (
          <tr>
            <td colSpan={6} className="px-4 py-4 text-center text-gray-500 italic">
              No turbines found
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default TurbineList;

