import express from "express";
import cors from "cors";
import "dotenv/config"; // silent env load
import connectDB from "./config/db.js";
import parkingLotRoutes from "./routes/parkingLot.routes.js"
import { errorHandler } from "./utils/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes

app.use("/api/parking-lots", parkingLotRoutes);

// Health check
app.get("/health", (req, res) => res.send("ok"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});