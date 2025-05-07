// Models for API responses

export interface BrazilState {
  uid: number;
  uf: string;
  state: string;
  cases: number;
  deaths: number;
  suspects?: number;
  refuses?: number;
  broadcast?: boolean;
  comments?: string;
  datetime: string;
}

export interface BrazilStateResponse {
  data: BrazilState[];
}

export interface CountryData {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string;
}

export interface CountriesResponse {
  data: CountryData[];
}

export interface BrazilData {
  country: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  updated_at: string;
}

export interface BrazilResponse {
  data: BrazilData;
}

export interface ApiStatus {
  status: string;
  date: string;
  environment: string;
  aws: {
    region: string;
    function_version: string;
  };
}

export interface CovidFormData {
  state: string;
  cases: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  date: string;
}