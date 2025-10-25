import { Router } from 'express';
import { CountryController } from '../controllers/country.controller';

const router = Router();
const controller = new CountryController();

// GET /status
router.get('/', (req, res) => controller.getStatus(req, res));

export default router;