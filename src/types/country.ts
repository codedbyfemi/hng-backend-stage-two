import { Country as PrismaCountry, RefreshMeta as PrismaRefreshMetadata } from '@prisma/client';

export type Country = PrismaCountry;
export type RefreshMetadata = PrismaRefreshMetadata;

export interface CountryCreateInput {
  name: string;
  capital?: string;
  region?: string;
  population: number;
  currency_code?: string | null;
  exchange_rate?: number | null;
  estimated_gdp: number | null;
  flag_url?: string
}

export interface RestCountryResponse {
  name: string;
  capital?: string;
  region?: string;
  population: number;
  flag?: string;
  currencies?: Array<{
    code: string;
    name: string;
    symbol: string;
  }>;
}

export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  rates: {
    [key: string]: number;
  };
}

export interface CountryQuery {
  region?: string;
  currency?: string;
  sort?: string;
}

