# Country API

A RESTful API that fetches country data from external sources, stores it in MySQL using Prisma ORM, and provides CRUD operations with exchange rate calculations.

## Features

- Fetch country data from RestCountries API
- Fetch exchange rates from Open Exchange Rates API
- Calculate estimated GDP for each country
- Store and cache data in MySQL using Prisma
- Generate summary images
- Full CRUD operations
- Filter and sort capabilities

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

### 1. Clone and Install

```bash
git clone <repository-url>
cd country-api
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
PORT=3000
DATABASE_URL="mysql://username:password@localhost:3306/country_api"
```

### 3. Setup Database with Prisma

```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE country_api;"

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

### 4. Start the Server

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

## API Endpoints

### 1. Refresh Country Data
Fetch and cache all countries from external APIs.

```bash
POST http://localhost:3000/countries/refresh
```

**Response:**
```json
{
  "message": "Countries data refreshed successfully"
}
```

### 2. Get All Countries
Retrieve all countries with optional filters and sorting.

```bash
GET http://localhost:3000/countries
GET http://localhost:3000/countries?region=Africa
GET http://localhost:3000/countries?currency=NGN
GET http://localhost:3000/countries?sort=gdp_desc
```

**Query Parameters:**
- `region` - Filter by region (e.g., Africa, Europe)
- `currency` - Filter by currency code (e.g., NGN, USD)
- `sort` - Sort results:
  - `gdp_desc` - Sort by GDP descending
  - `gdp_asc` - Sort by GDP ascending
  - `name_asc` - Sort by name A-Z
  - `name_desc` - Sort by name Z-A

**Response:**
```json
[
  {
    "id": 1,
    "name": "Nigeria",
    "capital": "Abuja",
    "region": "Africa",
    "population": "206139589",
    "currencyCode": "NGN",
    "exchangeRate": "1600.2300",
    "estimatedGdp": "25767448125.20",
    "flagUrl": "https://flagcdn.com/ng.svg",
    "lastRefreshedAt": "2025-10-22T18:00:00.000Z"
  }
]
```

### 3. Get Country by Name
Retrieve a specific country by name.

```bash
GET http://localhost:3000/countries/Nigeria
```

**Response:**
```json
{
  "id": 1,
  "name": "Nigeria",
  "capital": "Abuja",
  "region": "Africa",
  "population": "206139589",
  "currencyCode": "NGN",
  "exchangeRate": "1600.2300",
  "estimatedGdp": "25767448125.20",
  "flagUrl": "https://flagcdn.com/ng.svg",
  "lastRefreshedAt": "2025-10-22T18:00:00.000Z"
}
```

### 4. Delete Country
Delete a country record from the database.

```bash
DELETE http://localhost:3000/countries/Nigeria
```

**Response:**
```json
{
  "message": "Country deleted successfully"
}
```

### 5. Get Status
Get total countries and last refresh timestamp.

```bash
GET http://localhost:3000/status
```

**Response:**
```json
{
  "total_countries": 250,
  "last_refreshed_at": "2025-10-22T18:00:00.000Z"
}
```

### 6. Get Summary Image
Retrieve the generated summary image.

```bash
GET http://localhost:3000/countries/image
```

Returns a PNG image with:
- Total number of countries
- Top 5 countries by GDP
- Last refresh timestamp

## Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create a new migration
npm run prisma:migrate

# Open Prisma Studio (Database GUI)
npm run prisma:studio

# Reset database
npx prisma migrate reset

# View current database schema
npx prisma db pull
```

## Project Structure

```
country-api/
├── prisma/
│   ├── schema.prisma          # Prisma schema definition
│   └── migrations/            # Database migrations
├── src/
│   ├── config/
│   │   └── prisma.ts          # Prisma client instance
│   ├── controllers/
│   │   └── country.controller.ts
│   ├── services/
│   │   ├── country.service.ts
│   │   └── externalApi.service.ts
│   ├── routes/
│   │   ├── country.routes.ts
│   │   └── status.routes.ts
│   ├── types/
│   │   └── country.ts
│   ├── utils/
│   │   └── imageGenerator.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   └── index.ts               # Application entry point
├── cache/                     # Generated images
├── .env                       # Environment variables
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Error Handling

The API returns consistent JSON error responses:

**404 Not Found:**
```json
{
  "error": "Country not found"
}
```

**400 Bad Request:**
```json
{
  "error": "Validation failed",
  "details": {
    "currency_code": "is required"
  }
}
```

**503 Service Unavailable:**
```json
{
  "error": "External data source unavailable",
  "details": "Could not fetch data from RestCountries API"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

## External APIs Used

- **Countries Data:** https://restcountries.com/v2/all
- **Exchange Rates:** https://open.er-api.com/v6/latest/USD

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Programming language
- **Prisma** - ORM for database management
- **MySQL** - Database
- **Axios** - HTTP client
- **dotenv** - Environment configuration

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```
