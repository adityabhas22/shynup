import Header from "../components/Header";
import Footer from "../components/Footer";

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
          
          <div className="bg-shynup-turquoise p-6 rounded-lg">
            <h3 className="text-shynup-black font-instrument text-[18px] font-bold mb-4">
              Get in Touch
            </h3>
            <p className="text-shynup-black font-instrument text-[16px] leading-normal">
              Have questions about our housekeeping services? Want to book a consultation? 
              Send us an email and we'll get back to you as soon as possible!
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Maid Illustration */}
      <div className="relative w-full overflow-hidden mt-8">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/bb1d9336fbc9cb1bd64f412a82d8c08049bfdee5?width=1029"
          alt="Shynup Maid Illustration"
          className="w-[514px] h-[391px] object-contain mx-auto block -ml-16"
        />
      </div>

      <Footer />
    </div>
  );
}
