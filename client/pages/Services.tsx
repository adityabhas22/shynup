import Header from "../components/Header";
import Footer from "../components/Footer";

interface Service {
  name: string;
  image: string;
  comingSoon?: boolean;
}

const services: Service[] = [
  {
    name: "Brooming",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/d22d58dce650cb26250425ff6cd156d3ace05d9f?width=310",
  },
  {
    name: "Mopping",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ad8612bffe5bd9ac95a7f53a455cfbaaf539296c?width=310",
  },
  {
    name: "Dusting",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/b484bf00b1d04f32711a591b52c0917bd5f92d65?width=310",
  },
  {
    name: "Toilet-cleaning",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/eff8d8cd3dedb7fee43861ac815fd27953945df9?width=310",
  },
  {
    name: "Utensils-washing",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/deb1178d917a0141bf69d04865b703cd03357368?width=310",
  },
  {
    name: "Kitchen-prep",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/1362aebc06a5635a394c74194e60bbaa8abd4030?width=310",
    comingSoon: true,
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-shynup-background">
      <Header showHomeIcon={true} />

      {/* Services Content */}
      <section className="px-7 py-4">
        <h1 className="text-shynup-black text-center font-proxima text-[30px] font-bold leading-normal mb-6">
          Services offered
        </h1>

        {/* Intro Text */}
        <div className="mb-8">
          <p className="text-shynup-black font-instrument text-[17px] leading-normal">
            At <span className="font-jeju">Shynup</span>, we offer a wide-range
            of services to keep your house clean almost effortlessly, and
            elegantly! Here are the services we offer:
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col">
              {/* Service Image */}
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-[155px] h-[140px] object-cover border-4 border-shynup-black mx-auto"
                />
              </div>

              {/* Service Label */}
              <div className="mt-2 mx-auto">
                <div className="bg-shynup-black rounded-[5px] px-4 py-1 min-w-[153px] text-center">
                  <span className="text-shynup-white font-instrument text-[14px] font-bold leading-normal">
                    {service.name}
                  </span>
                </div>
                {service.comingSoon && (
                  <p className="text-shynup-black font-instrument text-[13px] font-normal leading-normal text-center mt-1">
                    (coming-soon)
                  </p>
                )}
              </div>
            </div>
          ))}
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
