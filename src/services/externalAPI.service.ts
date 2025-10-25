import axios from 'axios';
import { RestCountryResponse, ExchangeRateResponse } from '../types/country';

const COUNTRIES_API = 'https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies';
const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/USD';

export class ExternalApiService {
  async fetchCountries(): Promise<RestCountryResponse[]> {
    try {
      const response = await axios.get<RestCountryResponse[]>(COUNTRIES_API, {
        timeout: 30000
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Could not fetch data from RestCountries API: ${error.message}`);
      }
      throw new Error('Could not fetch data from RestCountries API');
    }
  }

  async fetchExchangeRates(): Promise<ExchangeRateResponse> {
    try {
      const response = await axios.get<ExchangeRateResponse>(EXCHANGE_RATE_API, {
        timeout: 30000
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Could not fetch data from Exchange Rate API: ${error.message}`);
      }
      throw new Error('Could not fetch data from Exchange Rate API');
    }
  }
}