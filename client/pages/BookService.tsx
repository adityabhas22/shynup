import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function BookService() {

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
              Service Booking Form
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="mb-6">
              <p className="text-shynup-black font-instrument text-[17px] leading-normal mb-4">
                Ready to book our housekeeping services?
              </p>
              <p className="text-gray-600 font-instrument text-[15px] leading-normal mb-6">
                Click the button below to fill out our Google Form and we'll get back to you with a confirmation and next steps.
              </p>
            </div>

            <Button
              size="lg"
              className="bg-shynup-black text-shynup-white hover:bg-gray-800 px-8 py-3 font-proxima font-bold text-lg"
              onClick={() => {
                window.open('https://forms.gle/zWj1f3pFnyk4g7gr7', '_blank');
              }}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Open Booking Form
            </Button>

            <p className="text-xs text-gray-500 mt-4">
              You'll be redirected to Google Forms to complete your booking request
            </p>
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
