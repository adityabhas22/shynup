import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowWeWork() {
  return (
    <div className="min-h-screen bg-shynup-background">
      <Header showHomeIcon={true} />

      {/* How We Work Content */}
      <section className="px-7 py-4">
        <h1 className="text-shynup-black text-center font-proxima text-[30px] font-bold leading-normal mb-8">
          How we work?
        </h1>

        {/* Process Description */}
        <div className="space-y-6 text-shynup-black font-instrument text-[17px] leading-normal">
          <p>
            While onboarding the maids, we get security-related documents signed
            by them, and get the background verifications done.
          </p>

          <p>
            The customer is free to choose the time-slot in which he/she wants
            the maid. A maid is deployed to work in that time-slot. The same
            maid will be deployed everyday.
          </p>

          <p>
            The prices vary depending on the location of the customer and
            availability of maid.
          </p>

          <p>
            The customer has to pay <span className="font-jeju">Shynup</span> on
            a monthly-basis.
          </p>
        </div>
      </section>

      {/* Bottom Maid Illustration */}
      <div className="relative w-full overflow-hidden mt-12">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/0c3ed3e746d4e9d19a2c6982a346b38a4addb0da?width=1029"
          alt="Shynup Maid Illustration"
          className="w-[514px] h-[391px] object-contain mx-auto block"
        />
      </div>

      <Footer />
    </div>
  );
}
