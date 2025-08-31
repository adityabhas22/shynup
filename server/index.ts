import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleServiceBooking,
  getServiceRequests,
  getServiceRequestById,
  updateServiceRequestStatus,
} from "./routes/booking";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Service booking routes
  app.post("/api/book-service", handleServiceBooking);
  app.get("/api/service-requests", getServiceRequests);
  app.get("/api/service-requests/:id", getServiceRequestById);
  app.patch("/api/service-requests/:id/status", updateServiceRequestStatus);

  return app;
}
