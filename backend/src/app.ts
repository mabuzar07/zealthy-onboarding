import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import configRoutes from "./routes/config.routes";
import sequelize, { testConnection } from "./config/db.config";
import cors from "cors";
import { initializeDefaultConfig } from "./services/config.service";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/config", configRoutes);

sequelize
  .sync()
  .then(async () => {
    await testConnection();
    await initializeDefaultConfig();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
