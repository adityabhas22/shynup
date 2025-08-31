import { Request, Response } from "express";
import { z } from "zod";

// TODO: Replace with persistent storage solution (database)
// For now using in-memory storage (data will be lost on function restart)

const bookingSchema = z.object({
  city: z.string().min(1),
  apartmentName: z.string().min(1),
  flatNumber: z.string().min(1),
  services: z.string().min(1),
  serviceDate: z.string().min(1),
});

// In-memory storage for demo purposes (will be lost on function restart)
// For production, replace with a database
let serviceRequests: any[] = [];

export const handleServiceBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = bookingSchema.parse(req.body);

    // Generate unique service request ID
    const serviceRequestId = `SR${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    const serviceRequest = {
      id: serviceRequestId,
      ...bookingData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add new request to in-memory storage
    serviceRequests.push(serviceRequest);

    console.log(`New service request created: ${serviceRequestId}`);
    console.log("Request details:", serviceRequest);

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
    res.json({
      success: true,
      data: serviceRequests,
      total: serviceRequests.length,
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
    const serviceRequest = serviceRequests.find((req: any) => req.id === id);

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

    const requestIndex = serviceRequests.findIndex((req: any) => req.id === id);

    if (requestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    serviceRequests[requestIndex].status = status;
    serviceRequests[requestIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: "Service request status updated successfully",
      data: serviceRequests[requestIndex],
    });
  } catch (error) {
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
