import React from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const InfoCard = ({ icon, title, lines }) => (
  <div className="text-center">
    <div className="flex justify-center mb-2 sm:mb-4">{icon}</div>
    <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-widest text-[#6AAF48] mb-2 sm:mb-3">
      {title}
    </h3>
    {lines.map((line, index) => (
      <p
        key={index}
        className="text-gray-900 text-[11px] sm:text-sm leading-relaxed"
      >
        {line}
      </p>
    ))}
  </div>
);

const Footer = () => {
  const info = [
    {
      icon: <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-[#6AAF48]" />,
      title: "About Soydeli",
      lines: [
        "High-protein plant-based tofu",
        "100% Vegan · No Preservatives",
      ],
    },
    {
      icon: <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-[#6AAF48]" />,
      title: "Talk To Us",
      lines: ["+91 8828 55 6000", "Mon–Sat · 9am–6pm"],
    },
    {
      icon: <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-[#6AAF48]" />,
      title: "Orders & Wholesale",
      lines: ["hello@soydeli.in", "orders@soydeli.in"],
    },
    {
      icon: <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-[#6AAF48]" />,
      title: "Manufacturing Unit",
      lines: [
        "93, 9th Lane, Subhash Road",
        "Jaysingpur, Kolhapur · MH 416101",
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-white via-[] to-white pt-24 pb-12 border-t border-emerald-100">
      <div className="absolute inset-0 bg-emerald-50/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-16 sm:mb-20 lg:mb-24">
          {info.map((item, index) => (
            <InfoCard
              key={index}
              icon={item.icon}
              title={item.title}
              lines={item.lines}
            />
          ))}
        </div>

        <div className="border-t border-emerald-100 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700 text-xs sm:text-sm mb-4 md:mb-0 tracking-wide">
            © {new Date().getFullYear()} Soydeli Tofu · Vishal Industries ·
            FSSAI Certified · Made in Maharashtra
          </p>

          <div className="mb-4 md:mb-0">
            <img
              src="/new_logo.png"
              alt="Soydeli Tofu Logo"
              className="h-16 sm:h-20 md:h-24 object-contain drop-shadow-lg"
            />
          </div>

          <div className="flex space-x-6 sm:space-x-4">
            <a
              href="#"
              className="text-[#6AAF48] hover:text-[#6AAF48] transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="text-[#6AAF48] hover:text-[#6AAF48] transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="text-[#6AAF48] hover:text-[#6AAF48] transition"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center text-[10px] sm:text-[11px] tracking-wide text-[#6AAF48]">
          Designed & Developed by{" "}
          <span className="text-[#6AAF48] font-semibold">TheSocialKollab</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
