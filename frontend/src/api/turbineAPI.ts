import axios, { AxiosInstance } from 'axios';

export interface Turbine {
  id: number;
  location: string;
  status: string;
  powerOutput: number;
  windSpeed: number;
}

export interface TurbineCreate {
  location: string;
  status: string;
  powerOutput: number;
  windSpeed: number;
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5264',
});

export const getTurbines = (): Promise<Turbine[]> =>
  api.get('/turbines').then(res => res.data);

export const getTurbine = (id: string): Promise<Turbine> =>
  api.get(`/turbines/${id}`).then(res => res.data);

export const createTurbine = (turbine: TurbineCreate): Promise<Turbine> =>
  api.post('/turbines', turbine).then(res => res.data);
