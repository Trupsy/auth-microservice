import express from "express";
import fs from "fs";
import { CRes } from "./networking/CRes.js";
import { EResError } from "./enums/EResError.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "./lib/prisma.js";

const app = express();

// Swagger belgesi seçenekleri
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "Documentation for Express API using Swagger",
    },
  },
  apis: ["./**/*.js"], // API dosyalarınızı buraya ekleyin
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger belgesini sunmak için /api-docs yolunu kullanın
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Load all routes from the ./routes folder
const routes = fs.readdirSync("./routes");
routes.forEach((route) => {
  const router = require(`./routes/${route}`);

  // register route with filename
  app.use("/" + route.split(".")[0].toLowerCase(), router.default);

  console.log(`Route loaded: ${route}`);
});

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.listen(80, () => {
  console.log("Server is running on port 80");
});
