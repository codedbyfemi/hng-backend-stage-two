import dotenv from 'dotenv'
import express from 'express'
import countryRoutes from './routes/country.routes'
import statusRoutes from './routes/status.routes'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { jsonSerializer } from './middleware/jsonSerializer'


const app = express()
dotenv.config()

app.use(express.json())
app.use(jsonSerializer);


// Routes
app.use('/countries', countryRoutes);
app.use('/status', statusRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app
