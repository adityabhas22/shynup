import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";

// Service request status type
export const serviceRequestStatus = [
  "pending",
  "confirmed",
  "in-progress",
  "completed",
  "cancelled",
] as const;

export type ServiceRequestStatus = (typeof serviceRequestStatus)[number];

// Service requests table
export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  requestId: text("request_id").notNull().unique(), // SR1234567890ABCDE format
  city: text("city").notNull(),
  apartmentName: text("apartment_name").notNull(),
  flatNumber: text("flat_number").notNull(),
  services: text("services").notNull(),
  serviceDate: text("service_date").notNull(), // YYYY-MM-DD format
  status: text("status", { enum: serviceRequestStatus })
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Type exports for use in the application
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type NewServiceRequest = typeof serviceRequests.$inferInsert;
