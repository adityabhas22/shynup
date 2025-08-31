import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ServiceRequest, ServiceRequestsResponse } from "../../shared/api";
import { Loader2, Eye, EyeOff } from "lucide-react";

// Hard-coded admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "shynup2024",
};

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    if (adminLoggedIn === "true") {
      setIsLoggedIn(true);
      fetchServiceRequests();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
      fetchServiceRequests();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const fetchServiceRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/service-requests");
      const data: ServiceRequestsResponse = await response.json();

      if (data.success) {
        setServiceRequests(data.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch service requests.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching service requests:", error);
      toast({
        title: "Connection Error",
        description: "Unable to fetch service requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    setUpdatingStatus(requestId);
    try {
      const response = await fetch(`/api/service-requests/${requestId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast({
          title: "Status Updated",
          description: `Service request status updated to ${newStatus}.`,
        });
        fetchServiceRequests(); // Refresh the list
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to update service request status.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Connection Error",
        description: "Unable to update service request status.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "confirmed":
        return "default";
      case "in-progress":
        return "outline";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-shynup-background">
        <Header showHomeIcon={true} />

        <section className="px-5 py-8 max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-shynup-black font-proxima text-xl text-center">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-shynup-black font-proxima">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-shynup-black font-proxima">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-shynup-black text-shynup-white hover:bg-gray-800">
                  Login
                </Button>
              </form>

              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Demo Credentials:</strong><br />
                  Username: admin<br />
                  Password: shynup2024
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shynup-background">
      <Header showHomeIcon={true} />

      <section className="px-5 py-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-shynup-black font-proxima text-3xl font-bold">
            Service Requests Admin Panel
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
          >
            Logout
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-shynup-black font-proxima text-lg">
            Total Requests: {serviceRequests.length}
          </p>
          <Button
            onClick={fetchServiceRequests}
            disabled={loading}
            className="bg-shynup-black text-shynup-white hover:bg-gray-800"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              "Refresh"
            )}
          </Button>
        </div>

        {loading && serviceRequests.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2 text-shynup-black font-proxima">Loading service requests...</span>
          </div>
        ) : serviceRequests.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-12">
              <div className="text-center">
                <p className="text-shynup-black font-proxima text-lg mb-2">No service requests found</p>
                <p className="text-gray-600">Service requests will appear here once customers submit bookings.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {serviceRequests.map((request) => (
              <Card key={request.id} className="shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-shynup-black font-proxima text-xl">
                        Service Request #{request.id}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        Created: {formatDate(request.createdAt)}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(request.status)}>
                      {request.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label className="text-shynup-black font-proxima font-semibold">City</Label>
                      <p className="text-gray-700">{request.city}</p>
                    </div>
                    <div>
                      <Label className="text-shynup-black font-proxima font-semibold">Apartment</Label>
                      <p className="text-gray-700">{request.apartmentName}</p>
                    </div>
                    <div>
                      <Label className="text-shynup-black font-proxima font-semibold">Flat Number</Label>
                      <p className="text-gray-700">{request.flatNumber}</p>
                    </div>
                    <div>
                      <Label className="text-shynup-black font-proxima font-semibold">Service</Label>
                      <p className="text-gray-700">{request.services}</p>
                    </div>
                    <div>
                      <Label className="text-shynup-black font-proxima font-semibold">Service Date</Label>
                      <p className="text-gray-700">{new Date(request.serviceDate + 'T00:00:00').toLocaleDateString("en-IN")}</p>
                    </div>
                    {(request as any).startTime && (request as any).endTime && (
                      <div>
                        <Label className="text-shynup-black font-proxima font-semibold">Time Slot</Label>
                        <p className="text-gray-700">{(request as any).startTime} - {(request as any).endTime}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Last updated: {formatDate(request.updatedAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-shynup-black font-proxima">Update Status:</Label>
                      <Select
                        value={request.status}
                        onValueChange={(value) => updateRequestStatus(request.id, value)}
                        disabled={updatingStatus === request.id}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      {updatingStatus === request.id && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
