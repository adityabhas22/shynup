import { Request, Response } from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../database/connection";
import { serviceRequests, NewServiceRequest } from "../database/schema";

const bookingSchema = z.object({
  city: z.string().min(1),
  apartmentName: z.string().min(1),
  flatNumber: z.string().min(1),
  services: z.string().min(1),
  serviceDate: z.string().min(1),
});

// Fallback in-memory storage for when database is unavailable
let fallbackStorage: any[] = [];

export const handleServiceBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = bookingSchema.parse(req.body);

    // Generate unique service request ID
    const serviceRequestId = `SR${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    const newServiceRequest: NewServiceRequest = {
      requestId: serviceRequestId,
      city: bookingData.city,
      apartmentName: bookingData.apartmentName,
      flatNumber: bookingData.flatNumber,
      services: bookingData.services,
      serviceDate: bookingData.serviceDate,
      status: "pending",
    };

    // Insert into database
    const result = await db
      .insert(serviceRequests)
      .values(newServiceRequest)
      .returning();

    console.log(`New service request created: ${serviceRequestId}`);
    console.log("Request details:", result[0]);

    res.status(201).json({
      success: true,
      message: "Service booking request submitted successfully",
      serviceRequestId,
      status: "pending",
    });
  } catch (error) {
    console.error("Error processing service booking:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking data",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getServiceRequests = async (req: Request, res: Response) => {
  try {
    const allRequests = await db.select().from(serviceRequests);

    res.json({
      success: true,
      data: allRequests,
      total: allRequests.length,
    });
  } catch (error) {
    console.error("Error retrieving service requests:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getServiceRequestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [serviceRequest] = await db
      .select()
      .from(serviceRequests)
      .where(eq(serviceRequests.requestId, id))
      .limit(1);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    res.json({
      success: true,
      data: serviceRequest,
    });
  } catch (error) {
    console.error("Error retrieving service request:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateServiceRequestStatus = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      ![
        "pending",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled",
      ].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const result = await db
      .update(serviceRequests)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(serviceRequests.requestId, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    res.json({
      success: true,
      message: "Service request status updated successfully",
      data: result[0],
    });
  } catch (error) {
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
