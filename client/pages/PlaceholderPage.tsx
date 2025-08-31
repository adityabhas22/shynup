import Header from "../components/Header";
import Footer from "../components/Footer";

interface PlaceholderPageProps {
  title: string;
  message?: string;
}

export default function PlaceholderPage({
  title,
  message = "This page is under construction. Please check back soon or contact us for more information.",
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-shynup-background">
      <Header showHomeIcon={true} />

      <section className="px-7 py-8 min-h-[400px] flex flex-col justify-center">
        <h1 className="text-shynup-black text-center font-proxima text-[30px] font-bold leading-normal mb-8">
          {title}
        </h1>

        <div className="text-center">
          <p className="text-shynup-black font-instrument text-[17px] leading-normal mb-8">
            {message}
          </p>

          <div className="inline-block bg-shynup-turquoise px-6 py-3 rounded-lg">
            <p className="text-shynup-black font-instrument text-[16px] font-bold">
              Coming Soon!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
