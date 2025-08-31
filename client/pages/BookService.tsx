import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ServiceBookingRequest, ServiceBookingResponse } from "../../shared/api";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const bookingFormSchema = z.object({
  city: z.string().min(1, "Please select a city"),
  apartmentName: z.string().min(1, "Apartment name is required").min(2, "Apartment name must be at least 2 characters"),
  flatNumber: z.string().min(1, "Flat number is required").min(1, "Please enter a valid flat number"),
  services: z.string().min(1, "Please select a service"),
  serviceDate: z.date({
    required_error: "Please select a service date",
  }).refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, {
    message: "Service date must be today or in the future",
  }),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function BookService() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      city: "",
      apartmentName: "",
      flatNumber: "",
      services: "",
      serviceDate: undefined,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const requestData = {
        ...data,
        serviceDate: data.serviceDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
      };

      const response = await fetch("/api/book-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result: ServiceBookingResponse = await response.json();

      if (result.success) {
        console.log("Service booking successful:", result);
        toast({
          title: "Booking Submitted Successfully! 🎉",
          description: `Your service request ID is: ${result.serviceRequestId}. We will contact you soon to confirm your booking.`,
        });
        form.reset();
      } else {
        console.error("Service booking failed:", result);
        toast({
          title: "Booking Failed",
          description: result.message || "An error occurred while submitting your booking.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Connection Error",
        description: "Unable to submit your booking. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cities = ["Bengaluru", "Delhi-NCR", "Mumbai", "Pune", "Hyderabad"];
  const serviceOptions = [
    "Basic Cleaning (Brooming, Mopping, Dusting)",
    "Deep Cleaning (Basic + Toilet Cleaning)",
    "Full Service (All services + Utensils washing)",
    "Custom Package",
  ];

  return (
    <div className="min-h-screen bg-shynup-background">
      <Header showHomeIcon={true} />

      {/* Book Service Content */}
      <section className="px-5 py-8 max-w-2xl mx-auto">
        <h1 className="text-shynup-black text-center font-proxima text-[30px] font-bold leading-normal mb-8">
          Book a service
        </h1>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-shynup-black font-proxima text-xl">
              Service Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* City Selection */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-shynup-black font-proxima text-base">
                        Select your city:
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Apartment Name */}
                <FormField
                  control={form.control}
                  name="apartmentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-shynup-black font-proxima text-base">
                        Enter apartment name:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apartment name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Flat Number */}
                <FormField
                  control={form.control}
                  name="flatNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-shynup-black font-proxima text-base">
                        Enter flat number:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Flat number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Services Selection */}
                <FormField
                  control={form.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-shynup-black font-proxima text-base">
                        Select the services:
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose services" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceOptions.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Service Date Selection */}
                <FormField
                  control={form.control}
                  name="serviceDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-shynup-black font-proxima text-base">
                        Select service date:
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return date < today;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />



                {/* Submit Button */}
                <div className="pt-6 flex justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-shynup-black text-shynup-white hover:bg-gray-800 px-8 py-3 font-proxima font-bold text-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Proceed with Booking"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>

      {/* Bottom Maid Illustration */}
      <div className="relative w-full overflow-hidden mt-8">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/bb1d9336fbc9cb1bd64f412a82d8c08049bfdee5?width=1029"
          alt="Shynup Maid Illustration"
          className="w-[514px] h-[391px] object-contain mx-auto block"
        />
      </div>

      <Footer />
    </div>
  );
}
