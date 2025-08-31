import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface ReviewCard {
  name: string;
  location: string;
  image: string;
  review: string;
}

const reviews: ReviewCard[] = [
  {
    name: "Sarveshgoud Patil",
    location: "Bengaluru",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/7bb0ff3258168f8a87c7e7b685778fa1d671436b?width=144",
    review:
      "Super reliable service! The maid we got through them is punctual, polite, and handles everything without needing reminders. Truly effortless for me.",
  },
  {
    name: "Gautamee Karoshi",
    location: "Bengaluru",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/37e47955c01979ef7a1c4425ac65a3cb6a8bf0de?width=140",
    review:
      "Finally found a trustworthy maid service in Bangalore! Clean, professional, and very respectful of our home. Couldn't have asked for more.",
  },
  {
    name: "M. D. Venkatesh",
    location: "Bengaluru",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/86febc906a4f5caf75af5c8f8c336b1444135f62?width=144",
    review:
      "As someone with a busy schedule, I needed dependable help at home. The maid has been excellent, disciplined, neat, and caring. Would highly recommend.",
  },
  {
    name: "Abhinav Swaran Singh",
    location: "Delhi-NCR",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/41656fe3e064e0e6cb8f65ae7a6573846ce7ad6f?width=146",
    review:
      "I was skeptical at first, but their maid service has been amazing. Timely, efficient, and trustworthy, exactly what every household needs.",
  },
  {
    name: "Ashwini Gavali",
    location: "Delhi-NCR",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/a5127ddf010a805a634591211534fa2afe3ea7da?width=144",
    review:
      "Very professional and well-trained maids. My family feels at ease and the work is always done perfectly. Absolute peace of mind!",
  },
  {
    name: "Saurabh Sharma",
    location: "New Delhi",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/075f98a61f2ea24f50b5b00c4307fc8a544c0afa?width=144",
    review:
      "From day one, the maid has been fantastic. She manages everything so smoothly, and we finally get to relax without worrying about chores!",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-shynup-background">
      <Header />

      {/* Navigation Buttons Section */}
      <section className="relative w-full px-3 py-4">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <button
            onClick={() => handleNavigate("/book-service")}
            className="h-[74px] bg-shynup-black rounded-[15px] flex items-center justify-center text-shynup-white font-proxima text-[15px] font-bold hover:bg-gray-800 transition-colors"
          >
            Book a service
          </button>
          <button
            onClick={() => handleNavigate("/services")}
            className="h-[74px] bg-shynup-black rounded-[15px] flex items-center justify-center text-shynup-white font-proxima text-[15px] font-bold hover:bg-gray-800 transition-colors"
          >
            Services offered
          </button>
          <button
            onClick={() => handleNavigate("/how-we-work")}
            className="h-[74px] bg-shynup-black rounded-[15px] flex items-center justify-center text-shynup-white font-proxima text-[15px] font-bold hover:bg-gray-800 transition-colors"
          >
            How we work?
          </button>
          <button
            onClick={() => handleNavigate("/our-vision")}
            className="h-[74px] bg-shynup-black rounded-[15px] flex items-center justify-center text-shynup-white font-proxima text-[15px] font-bold hover:bg-gray-800 transition-colors"
          >
            Our vision
          </button>
        </div>
        {/* Bottom line separator */}
        <div className="h-[1px] bg-shynup-black mx-[18px] mt-6" />
      </section>

      {/* What we do Section */}
      <section className="px-7 py-8">
        <h2 className="text-shynup-black text-center font-proxima text-[30px] font-bold leading-normal mb-7">
          What we do?
        </h2>
        <div className="space-y-4 text-shynup-black font-instrument text-[17px] leading-normal">
          <p>
            <span className="font-bold">Monthly Subscription</span> - Same
            trusted maid comes daily, no need to book again & again.
          </p>
          <p>
            <span className="font-bold">Low & Transparent Charges</span> – No
            hidden costs, affordable for every household.
          </p>
          <p>
            <span className="font-bold">Quick & Hassle-Free Service</span> –
            Easy onboarding, maids start work without delay.
          </p>
          <p>
            <span className="font-bold">Verified & Responsible Maids</span> –
            All background checked and trained for safety.
          </p>
          <p>
            <span className="font-bold">Reliable Daily Housekeeping</span> –
            Utensil washing, brooming, mopping, dusting & toilet cleaning done
            on time.
          </p>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="px-2 py-8">
        <h2 className="text-shynup-black text-center font-inria text-[18px] font-bold leading-normal mb-8">
          Hear from our customers!
        </h2>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-shynup-black rounded-[15px] p-4 h-[213px] flex flex-col"
            >
              <div className="flex flex-col items-center mb-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-[72px] h-[74px] rounded-full object-cover mb-2"
                />
                <h3 className="text-shynup-white text-center font-inter text-[11px] font-bold leading-normal">
                  {review.name}
                </h3>
                <p className="text-shynup-white text-center font-inter text-[8px] font-bold leading-normal">
                  {review.location}
                </p>
              </div>
              <p className="text-shynup-white font-istok text-[11px] font-bold leading-[12px] text-center flex-1">
                {review.review}
              </p>
            </div>
          ))}
        </div>

        {/* Top line separator */}
        <div className="h-[1px] bg-shynup-black mx-[18px] mt-8" />
      </section>

      {/* Bottom Maid Illustration */}
      <div className="relative w-full overflow-hidden">
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
