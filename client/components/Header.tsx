import { useNavigate, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

interface HeaderProps {
  showHomeIcon?: boolean;
}

export default function Header({ showHomeIcon = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="w-full h-[136px] relative">
      {/* Turquoise gradient background */}
      <div
        className="w-full h-full absolute top-0 left-0"
        style={{
          background: "linear-gradient(180deg, #6EDCD8 92.65%, #FDFCFB 100%)",
        }}
      />

      {/* Maid illustration */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/77f2d636833a6121fc01780715ed5bc3bdd886ae?width=316"
        alt="Shynup Maid Illustration"
        className="absolute left-[-27px] top-4 w-[158px] h-[120px] object-contain"
      />

      {/* Shynup Logo Text */}
      <div className="absolute left-[106px] top-[54px] w-[177px] h-[30px]">
        <h1
          className="text-shynup-black text-center font-jeju text-[40px] font-normal leading-normal cursor-pointer"
          onClick={() => navigate("/")}
        >
          Shynup
        </h1>
      </div>

      {/* Tagline */}
      <div className="absolute left-[121px] top-[96px] w-[224px] h-[17px]">
        <p className="text-shynup-black font-instrument text-[11px] font-bold leading-normal">
          "Simplifying housekeeping!"
        </p>
      </div>

      {/* Home Icon (for non-home pages) */}
      {(showHomeIcon || !isHomePage) && (
        <button
          onClick={() => navigate("/")}
          className="absolute right-[19px] top-[62px] w-[27px] h-[27px] flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <Home className="w-6 h-6 text-shynup-black" />
        </button>
      )}

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-[18px] right-[18px] h-[1px] bg-shynup-black" />
    </header>
  );
}
