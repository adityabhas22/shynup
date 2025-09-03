import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-shynup-background">
      <Header showHomeIcon={true} />

      <section className="px-7 py-8 min-h-[400px]">
        <h1 className="text-shynup-black text-center font-proxima text-[30px] font-bold leading-normal mb-8">
          Contact us
        </h1>

        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <p className="text-shynup-black font-instrument text-[17px] leading-normal">
              <span className="font-bold">Email:</span> letsshynup@gmail.com
            </p>
          </div>

          <div className="bg-shynup-turquoise p-6 rounded-lg mb-6">
            <h3 className="text-shynup-black font-instrument text-[18px] font-bold mb-4">
              Get in Touch
            </h3>
            <p className="text-shynup-black font-instrument text-[16px] leading-normal mb-4">
              Have questions about our housekeeping services? Want to book a
              consultation? Send us an email and we'll get back to you as soon
              as possible!
            </p>

            <Button
              size="lg"
              className="bg-shynup-black text-white hover:bg-gray-800 px-6 py-2 font-proxima font-bold"
              onClick={() => {
                window.open('https://forms.gle/zWj1f3pFnyk4g7gr7', '_blank');
              }}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Contact Form
            </Button>
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
