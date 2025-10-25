import app from './app'

const port = process.env.PORT ?? 3000

// Start server
async function startServer() {
  
  app.listen(port, () => {
    console.log(`✓ Server running on http://localhost:${port}`);
    console.log(`✓ Available endpoints:`);
    console.log(`  POST   http://localhost:${port}/countries/refresh`);
    console.log(`  GET    http://localhost:${port}/countries`);
    console.log(`  GET    http://localhost:${port}/countries/:name`);
    console.log(`  DELETE http://localhost:${port}/countries/:name`);
    console.log(`  GET    http://localhost:${port}/status`);
  });   console.log(`Server running on port ${port}`)
}

startServer()

