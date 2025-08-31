import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="w-full h-[165px] relative">
      {/* Background Image */}
      <img 
        src="https://api.builder.io/api/v1/image/assets/TEMP/f55ee858265664d2278fd5032aef1c621c7800d6?width=796"
        alt="Footer Background"
        className="absolute left-[-4px] top-0 w-[398px] h-[223px] object-cover"
      />
      
      {/* Dark Overlay */}
      <div className="absolute top-[1px] left-0 w-full h-[165px] bg-shynup-gray opacity-65" />
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {/* Company Section */}
        <div className="absolute left-[58px] top-[28px]">
          <h3 className="text-shynup-white text-center font-inter text-[11px] font-bold leading-normal mb-[25px]">
            Company
          </h3>
          <div className="space-y-[19px]">
            <button
              onClick={() => handleLinkClick("/board-of-directors")}
              className="block text-shynup-white font-istok text-[10px] font-normal leading-[9px] underline hover:opacity-80 transition-opacity"
            >
              Board-of-Directors
            </button>
            <button
              onClick={() => handleLinkClick("/terms-conditions")}
              className="block text-shynup-white font-istok text-[10px] font-normal leading-[9px] underline hover:opacity-80 transition-opacity"
            >
              Terms & conditions
            </button>
            <button
              onClick={() => handleLinkClick("/security-measures")}
              className="block text-shynup-white font-istok text-[10px] font-normal leading-[9px] underline hover:opacity-80 transition-opacity"
            >
              Security measures
            </button>
            <button
              onClick={() => handleLinkClick("/contact-us")}
              className="block text-shynup-white font-istok text-[10px] font-normal leading-[9px] underline hover:opacity-80 transition-opacity"
            >
              Contact us
            </button>
          </div>
        </div>
        
        {/* Social Links Section */}
        <div className="absolute left-[226px] top-[28px]">
          <h3 className="text-shynup-white text-center font-inter text-[11px] font-bold leading-normal mb-[28px]">
            Social-links
          </h3>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
            aria-label="Follow us on Instagram"
          >
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/f192832d7ff7410efead8086f2e23c327f2f94da?width=54"
              alt="Instagram"
              className="w-[27px] h-[27px]"
            />
          </a>
        </div>
        
        {/* Copyright */}
        <div className="absolute left-[38px] top-[143px] w-[320px]">
          <p className="text-shynup-white text-center font-inter text-[9px] font-normal leading-normal">
            © 2025 Shynup. All rights reserved | Built on trust & transparency
          </p>
        </div>
      </div>
    </footer>
  );
}
