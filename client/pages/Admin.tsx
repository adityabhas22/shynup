import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-shynup-background">
      <Header showHomeIcon={true} />

      <section className="px-5 py-8 max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-shynup-black font-proxima text-[30px] font-bold">
            Admin Panel
          </h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-shynup-black font-proxima text-xl text-center">
              Admin Panel Unavailable
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="mb-6">
              <p className="text-shynup-black font-instrument text-[17px] leading-normal mb-4">
                The admin panel has been disabled.
              </p>
              <p className="text-gray-600 font-instrument text-[15px] leading-normal mb-6">
                Since we removed all server components and database connections, the admin functionality for managing service requests is no longer available.
              </p>
              <p className="text-gray-600 font-instrument text-[15px] leading-normal">
                All booking requests are now handled through Google Forms. You can manage submissions directly in Google Forms or export the data as needed.
              </p>
            </div>

            <Button
              onClick={() => navigate('/')}
              className="bg-shynup-black text-white hover:bg-gray-800 px-8 py-3 font-proxima font-bold"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
