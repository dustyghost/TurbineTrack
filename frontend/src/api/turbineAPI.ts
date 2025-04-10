import axios from 'axios';
import { Turbine, Area, Country, TurbineCreate } from '../types/models';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
});

export const getTurbines = async (): Promise<Turbine[]> => {
  const res = await api.get('/turbines');
  return res.data;
};

export const getTurbine = async (id: number): Promise<Turbine> => {
  const res = await api.get(`/turbines/${id}`);
  return res.data;
};

export const updateTurbine = async (id: number, turbine: Turbine): Promise<void> => {
  await api.put(`/turbines/${id}`, turbine);
};

export const createTurbine = async (turbine: TurbineCreate): Promise<void> => {
  await api.post('/turbines', turbine);
};

export const getCountries = async (): Promise<Country[]> => {
  const res = await api.get('/countries');
  return res.data;
};

export const getAreas = async (): Promise<Area[]> => {
  const res = await api.get('/areas');
  return res.data;
};

export const getAreasByCountry = async (countryId: number): Promise<Area[]> => {
  const res = await api.get(`/countries/${countryId}/areas`);
  return res.data;
};

export const deleteTurbine = async (id: number): Promise<void> => {
  await api.delete(`/turbines/${id}`);
};
