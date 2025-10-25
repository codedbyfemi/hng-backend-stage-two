import { prisma } from "../config/prisma";
import { Country, CountryCreateInput, CountryQuery, RestCountryResponse } from "../types/country";
import { ExternalApiService } from "./externalAPI.service";
import { Prisma } from "@prisma/client";

export class CountryService {
    private externalApi = new ExternalApiService();
    async refreshCountries(): Promise<void> {
        // Fetch data from external APIs
        const [countriesData, exchangeRateData] = await Promise.all([
        this.externalApi.fetchCountries(),
        this.externalApi.fetchExchangeRates()
        ]);

        const exchangeRates = exchangeRateData.rates;

        // Process each country
        for (const countryData of countriesData) {
        const currencyCode = countryData.currencies?.[0]?.code || null;
        
        let exchangeRate: number | null = null;
        let estimatedGdp: number | null = null;

        if (currencyCode && exchangeRates[currencyCode]) {
            exchangeRate = exchangeRates[currencyCode];
            const randomMultiplier = Math.random() * (2000 - 1000) + 1000;
            estimatedGdp = (Number(countryData.population) * randomMultiplier) / exchangeRate;
        } else if (!currencyCode) {
            estimatedGdp = 0;
        }

        const countryInput: CountryCreateInput = {
            name: countryData.name,
            capital: countryData.capital,
            region: countryData.region,
            population: countryData.population,
            currency_code: currencyCode,
            exchange_rate: exchangeRate ? exchangeRate : null,
            estimated_gdp: estimatedGdp !== null ? estimatedGdp : 0,
            flag_url: countryData.flag
        };

        await this.upsertCountry(countryInput);
        }

        const now = new Date();
        await prisma.refreshMeta.upsert({
        where: { id: 1 },
        update: {
            last_refreshed_at: now,
            total_countries: countriesData.length
        },
        create: {
            id: 1,
            last_refreshed_at: now,
            total_countries: countriesData.length
        }
        });
    }

    private async upsertCountry(countryInput: CountryCreateInput): Promise<void> {
    await prisma.country.upsert({
      where: {
        name: countryInput.name
      },
      update: {
        capital: countryInput.capital,
        region: countryInput.region,
        population: countryInput.population,
        currency_code: countryInput.currency_code,
        exchange_rate: countryInput.exchange_rate,
        estimated_gdp: countryInput.estimated_gdp,
        flag_url: countryInput.flag_url,
        last_refreshed_at: new Date()
      },
    create: countryInput
    });
  }


  async getCountryByName(name: string): Promise<Country | null> {
    const country = await prisma.country.findFirst({
      where: {
        name: {
            equals: name,
        }
      }
    });

    return country;
  }

  async getAllCountries(query: CountryQuery): Promise<Country[]> {
    const where: Prisma.CountryWhereInput = {};

    if (query.region) {
      where.region = query.region;
    }

    if (query.currency) {
      where.currency_code = query.currency;
    }

    // Determine sorting
    let orderBy: Prisma.CountryOrderByWithRelationInput = { name: 'asc' };
;

    if (query.sort === 'gdp_desc') {
      orderBy = { estimated_gdp: 'desc' };
    } else if (query.sort === 'gdp_asc') {
      orderBy = { estimated_gdp: 'asc' };
    } else if (query.sort === 'name_asc') {
      orderBy = { name: 'asc' };
    } else if (query.sort === 'name_desc') {
      orderBy = { name: 'desc' };
    } else {
        orderBy = { name: 'asc' };
    }

    const countries = await prisma.country.findMany({
      where,
      orderBy
    });

    return countries;
  }

  async getStatus(): Promise<{ total_countries: number; last_refreshed_at: Date | null }> {
    const metadata = await prisma.refreshMeta.findUnique({
      where: { id: 1 }
    });

    return {
      total_countries: metadata?.total_countries || 0,
      last_refreshed_at: metadata?.last_refreshed_at || null
    };
  }

  async deleteCountry(name: string): Promise<boolean> {
    try {
        await prisma.country.delete({
            where: {
                name: name
            }
        });
        return true;
    } catch (error) {
        // If country doesn't exist, Prisma throws an error
        return false;
    }
  }
} 
