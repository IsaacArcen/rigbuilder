//Express server setup for RigBuilder API
const express = require("express");

//CORS så att frontend kan kommunicera med backend
const cors = require("cors");

//För att läsa .env-filer
const dotenv = require("dotenv");

//Läser in miljövariabler från .env-filen
dotenv.config();

//Skapar Express-appen
const app = express();

//Bestämmer porten för server (5000 om PORT inte finns i .env)
const port = process.env.PORT || 5000;

//Tillåter req från frontend och hanterar JSON-data
app.use(cors());
app.use(express.json());

//Kopplar produkt-routers till /api/products
app.use("/api/products", require("./routers/productRoutes"));

//Test route
app.get("/", (req, res) => {
  res.send("RigBuilder API is running");
});

//Error handling middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// startar server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});