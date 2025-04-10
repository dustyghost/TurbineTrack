export interface Country {
  id: number;
  name: string;
}

export interface Area {
  id: number;
  name: string;
  countryId: number;
  country?: Country;
}

export interface Turbine {
  id: number;
  location: string;
  status: string;
  powerOutput: number;
  windSpeed: number;
  areaId: number;
  area?: Area;
}

export interface TurbineCreate {
  location: string;
  status: string;
  powerOutput: number;
  windSpeed: number;
  areaId: number;
}
