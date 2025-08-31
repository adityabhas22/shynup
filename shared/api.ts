/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Service booking request data
 */
export interface ServiceBookingRequest {
  city: string;
  apartmentName: string;
  flatNumber: string;
  services: string;
  serviceDate: string; // ISO date string
}

/**
 * Service request status
 */
export type ServiceRequestStatus =
  | "pending"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

/**
 * Service request data stored in the system
 */
export interface ServiceRequest {
  id: string;
  city: string;
  apartmentName: string;
  flatNumber: string;
  services: string;
  serviceDate: string; // ISO date string
  status: ServiceRequestStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Service booking response
 */
export interface ServiceBookingResponse {
  success: boolean;
  message: string;
  serviceRequestId?: string;
  status?: ServiceRequestStatus;
  errors?: any[];
}

/**
 * Service requests list response
 */
export interface ServiceRequestsResponse {
  success: boolean;
  data: ServiceRequest[];
  total: number;
  message?: string;
}

/**
 * Single service request response
 */
export interface ServiceRequestResponse {
  success: boolean;
  data?: ServiceRequest;
  message?: string;
}

/**
 * Service request status update request
 */
export interface UpdateServiceRequestStatusRequest {
  status: ServiceRequestStatus;
}

/**
 * Service request status update response
 */
export interface UpdateServiceRequestStatusResponse {
  success: boolean;
  message: string;
  data?: ServiceRequest;
}
