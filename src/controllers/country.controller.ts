import { Request, Response } from 'express';
import { CountryService } from '../services/country.service';

const countryService = new CountryService();

export class CountryController {
  async refreshCountries(req: Request, res: Response): Promise<void> {
    try {
      await countryService.refreshCountries();
      res.json({ 
        message: 'Countries data refreshed successfully' 
      });
    } catch (error: any) {
      console.error('Refresh error:', error);
      res.status(503).json({
        error: 'External data source unavailable',
        details: error.message
      });
    }
  }

  async getAllCountries(req: Request, res: Response): Promise<void> {
    try {
      const query = {
        region: req.query.region as string,
        currency: req.query.currency as string,
        sort: req.query.sort as string
      };

      const countries = await countryService.getAllCountries(query);
      res.json(countries);
    } catch (error) {
      console.error('Get all countries error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getCountryByName(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      const country = await countryService.getCountryByName(name);

      if (!country) {
        res.status(404).json({ error: 'Country not found' });
        return;
      }

      res.json(country);
    } catch (error) {
      console.error('Get country by name error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteCountry(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;
      const deleted = await countryService.deleteCountry(name);

      if (!deleted) {
        res.status(404).json({ error: 'Country not found' });
        return;
      }

      res.json({ message: 'Country deleted successfully' });
    } catch (error) {
      console.error('Delete country error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const status = await countryService.getStatus();
      res.json(status);
    } catch (error) {
      console.error('Get status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}