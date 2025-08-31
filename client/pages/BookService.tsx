import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface BookingForm {
  city: string;
  apartmentName: string;
  flatNumber: string;
  services: string;
  startTime: string;
  endTime: string;
}

export default function BookService() {
  const [formData, setFormData] = useState<BookingForm>({
    city: "",
    apartmentName: "",
    flatNumber: "",
    services: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProceed = () => {
    // For now, just log the form data
    console.log("Booking form submitted:", formData);
    alert("Booking request submitted! We will contact you soon.");
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
      <section className="px-5 py-4 max-w-md mx-auto">
        <h1 className="text-shynup-black text-center font-proxima text-[30px] font-bold leading-normal mb-8">
          Book a service
        </h1>

        {/* Booking Form */}
        <div className="space-y-6">
          {/* City Selection */}
          <div>
            <label className="block text-shynup-black font-proxima text-[20px] font-normal mb-2">
              Select your city:
            </label>
            <select
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="w-full h-[22px] border-2 border-shynup-black bg-shynup-input-gray px-2 text-sm"
            >
              <option value="">Choose a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Apartment Name */}
          <div>
            <label className="block text-shynup-black font-proxima text-[20px] font-normal mb-2">
              Enter apartment name:
            </label>
            <input
              type="text"
              value={formData.apartmentName}
              onChange={(e) =>
                handleInputChange("apartmentName", e.target.value)
              }
              className="w-full h-[22px] border-2 border-shynup-black bg-shynup-input-gray px-2 text-sm"
              placeholder="Apartment name"
            />
          </div>

          {/* Flat Number */}
          <div>
            <label className="block text-shynup-black font-proxima text-[20px] font-normal mb-2">
              Enter flat number:
            </label>
            <input
              type="text"
              value={formData.flatNumber}
              onChange={(e) => handleInputChange("flatNumber", e.target.value)}
              className="w-full h-[22px] border-2 border-shynup-black bg-shynup-input-gray px-2 text-sm"
              placeholder="Flat number"
            />
          </div>

          {/* Services Selection */}
          <div>
            <label className="block text-shynup-black font-proxima text-[20px] font-normal mb-2">
              Select the services:
            </label>
            <select
              value={formData.services}
              onChange={(e) => handleInputChange("services", e.target.value)}
              className="w-full h-[22px] border-2 border-shynup-black bg-shynup-input-gray px-2 text-sm"
            >
              <option value="">Choose services</option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="block text-shynup-black font-proxima text-[20px] font-normal mb-2">
              Please select a time-slot:
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                  className="w-[100px] h-[22px] border-2 border-shynup-black bg-shynup-input-gray px-1 text-sm"
                />
              </div>
              <span className="text-shynup-black font-proxima text-[20px] font-normal">
                to
              </span>
              <div className="flex items-center">
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className="w-[100px] h-[22px] border-2 border-shynup-black bg-shynup-input-gray px-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <div className="pt-8 flex justify-center">
            <button
              onClick={handleProceed}
              className="bg-shynup-black text-shynup-white font-proxima text-[20px] font-bold px-6 py-2 rounded border border-shynup-black hover:bg-gray-800 transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
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
