import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OurVision() {
  return (
    <div className="min-h-screen bg-shynup-background">
      <Header showHomeIcon={true} />

      {/* Our Vision Content */}
      <section className="px-7 py-4">
        <h1 className="text-shynup-black text-center font-proxima text-[30px] font-bold leading-normal mb-8">
          Our vision
        </h1>

        {/* Vision Text */}
        <div className="space-y-6 text-shynup-black font-instrument text-[17px] leading-normal">
          <p>
            Here at <span className="font-jeju">Shynup</span>, our vision is to
            organise the highly unorganised daily-housekeeping-sector of tier-1
            India. Sometimes the regular maid isn't punctual enough, doesn't
            clean deeply, isn't professional, takes too many leaves, and the
            list never ends! And what's worse? You lose that maid, you don't
            even know where to look for a new one?
          </p>

          <p>
            We come to you as a solution to all the above problems. Our only
            goal is to make sure our customers are getting whatever they paid
            for, to get their houses cleaned the way they want to, with minimal
            service-charges, and also making sure that the maids are happy
            enough to work in their houses.
          </p>

          <p>
            Our team is giving in every drop of blood-sweat-&-tear to make sure
            that the housekeeping problems of tier-1 India are solved.
          </p>
        </div>
      </section>

      {/* Bottom Maid Illustration */}
      <div className="relative w-full overflow-hidden mt-12">
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
