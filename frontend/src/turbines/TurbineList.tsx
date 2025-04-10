import React, { useEffect, useState } from 'react';
import { getTurbines } from '../api/turbineAPI';
import { Link } from 'react-router-dom';
import { Turbine } from '../types/models';

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
        <input
          type="text"
          placeholder="Filter by country"
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Filter by status"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'location' | 'power')}
          className="border p-2 rounded w-full"
        >
          <option value="location">Sort by Location</option>
          <option value="power">Sort by Power Output</option>
        </select>
      </div>

      <ul className="bg-white shadow rounded-xl divide-y divide-gray-200">
        {filtered.map((turbine) => (
          <li key={turbine.id} className="px-4 py-3 hover:bg-gray-50">
            <Link className="text-blue-500 hover:underline" to={`/turbines/${turbine.id}`}>
              {turbine.location} — <span className="font-medium">{turbine.status}</span> ({turbine.area?.country?.name})
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-4 py-4 text-gray-500 italic">No turbines found</li>
        )}
      </ul>
    </div>
  );
};

export default TurbineList;

