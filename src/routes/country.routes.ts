import { Router } from 'express';
import { CountryController } from '../controllers/country.controller';

const router = Router();
const controller = new CountryController();

// POST /countries/refresh
router.post('/refresh', (req, res) => controller.refreshCountries(req, res));

// GET /countries
router.get('', (req, res) => controller.getAllCountries(req, res));

// GET /countries/:name
router.get('/:name', (req, res) => controller.getCountryByName(req, res));

// DELETE /countries/:name
router.delete('/:name', (req, res) => controller.deleteCountry(req, res));

export default router;