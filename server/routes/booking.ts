import { Request, Response } from "express";
import { z } from "zod";
import { getStore } from "@netlify/blobs";

const bookingSchema = z.object({
  city: z.string().min(1),
  apartmentName: z.string().min(1),
  flatNumber: z.string().min(1),
  services: z.string().min(1),
  serviceDate: z.string().min(1),
});

export const handleServiceBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = bookingSchema.parse(req.body);

    // Generate unique service request ID
    const serviceRequestId = `SR${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    const serviceRequestData = {
      id: serviceRequestId,
      requestId: serviceRequestId,
      city: bookingData.city,
      apartmentName: bookingData.apartmentName,
      flatNumber: bookingData.flatNumber,
      services: bookingData.services,
      serviceDate: bookingData.serviceDate,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in Netlify Blobs
    const store = getStore("service-requests");
    await store.setJSON(serviceRequestId, serviceRequestData);

    console.log(`New service request created: ${serviceRequestId}`);
    console.log("Request details:", serviceRequestData);

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
    const store = getStore("service-requests");
    const { blobs } = await store.list();

    // Get all service requests
    const allRequests = await Promise.all(
      blobs.map(async (blob) => {
        const data = await store.get(blob.key, { type: "json" });
        return data;
      }),
    );

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
    const store = getStore("service-requests");

    const serviceRequest = await store.get(id, { type: "json" });

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

    const store = getStore("service-requests");

    // Get current data
    const currentData = await store.get(id, { type: "json" });

    if (!currentData) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    // Update the data
    const updatedData = {
      ...currentData,
      status,
      updatedAt: new Date().toISOString(),
    };

    // Save updated data
    await store.setJSON(id, updatedData);

    res.json({
      success: true,
      message: "Service request status updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
