import { useState, useEffect } from "react";

// Importing required courier logos only
import upsLogo from "@/assets/partners/UPS_v2.png";
import dhlLogo from "@/assets/partners/dhl.avif";
import fedexLogo from "@/assets/partners/FedEx-Logo.png";
import aramexLogo from "@/assets/partners/Aramex.png";
import bluedartLogo from "@/assets/partners/BlueDart.png";

// Stat boxes shown in the auto-scrolling marquee
const statBoxes = [
  { value: "100+", label: "Global Partners" },
  { value: "100+", label: "Destinations" },
  { value: "24/7", label: "Support" },
  { value: "99%", label: "On-time Delivery" },
  { value: "700+", label: "Exporters", sub: "SMEs Empowered" },
  { value: "300+", label: "Importers", sub: "Trusted by Leading Businesses" },
];

const PartnersSection = () => {
  const [currentSet, setCurrentSet] = useState(0);

  // Trusted courier partners ONLY
  const partners = [
    { name: "UPS", logo: upsLogo },
    { name: "DHL", logo: dhlLogo },
    { name: "FedEx", logo: fedexLogo },
    { name: "Aramex", logo: aramexLogo },
    { name: "Blue Dart International", logo: bluedartLogo },
  ];

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % Math.ceil(partners.length / 6));
    }, 3000);
    return () => clearInterval(interval);
  }, [partners.length]);

  const getVisiblePartners = () => {
    const startIndex = currentSet * 6;
    return partners.slice(startIndex, startIndex + 6);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted <span className="text-[#0D2DD0]">courier partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Collaborating with industry leaders to provide seamless global logistics solutions
          </p>
        </div>

        {/* Desktop Auto Scrolling */}
        <div className="hidden md:block overflow-hidden">
          <div className="flex items-center animate-scroll-partners">
            {/* First Set */}
            <div className="flex items-center space-x-12 shrink-0 px-6">
              {partners.map((partner, index) => (
                <div
                  key={`set1-${partner.name}-${index}`}
                  className="flex-shrink-0 w-36 h-28 bg-card rounded-lg border border-border/50 
                  hover:border-primary/30 transition-all duration-300 hover:shadow-medium 
                  flex flex-col items-center justify-center group animate-scale-in p-3"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Second Set (Duplicate for seamless loop) */}
            <div className="flex items-center space-x-12 shrink-0 px-6">
              {partners.map((partner, index) => (
                <div
                  key={`set2-${partner.name}-${index}`}
                  className="flex-shrink-0 w-36 h-28 bg-card rounded-lg border border-border/50 
                  hover:border-primary/30 transition-all duration-300 hover:shadow-medium 
                  flex flex-col items-center justify-center group animate-scale-in p-3"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Third Set (Extra buffer for wide screens) */}
            <div className="flex items-center space-x-12 shrink-0 px-6">
              {partners.map((partner, index) => (
                <div
                  key={`set3-${partner.name}-${index}`}
                  className="flex-shrink-0 w-36 h-28 bg-card rounded-lg border border-border/50 
                  hover:border-primary/30 transition-all duration-300 hover:shadow-medium 
                  flex flex-col items-center justify-center group animate-scale-in p-3"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Fourth Set (Extra buffer for wide screens) */}
            <div className="flex items-center space-x-12 shrink-0 px-6">
              {partners.map((partner, index) => (
                <div
                  key={`set4-${partner.name}-${index}`}
                  className="flex-shrink-0 w-36 h-28 bg-card rounded-lg border border-border/50 
                  hover:border-primary/30 transition-all duration-300 hover:shadow-medium 
                  flex flex-col items-center justify-center group animate-scale-in p-3"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 transition-all duration-500">
            {getVisiblePartners().map((partner) => (
              <div
                key={partner.name}
                className="w-full h-24 bg-card rounded-lg border border-border/50 
                hover:border-primary/30 transition-all duration-300 hover:shadow-medium 
                flex flex-col items-center justify-center group animate-fade-in p-3"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <p className="mt-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(partners.length / 6) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSet
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                onClick={() => setCurrentSet(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats — auto-scrolling marquee (opposite direction) */}
        <div className="mt-16 overflow-hidden">
          <div className="flex items-stretch animate-scroll-partners-reverse">
            {/* Two identical sets for a seamless loop */}
            {[0, 1].map((set) => (
              <div key={set} className="flex items-stretch gap-6 shrink-0 px-3">
                {statBoxes.map((stat, i) => (
                  <div
                    key={`${set}-${i}`}
                    className="text-center p-6 rounded-lg bg-card border border-border/50 w-56 shrink-0 flex flex-col justify-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    {stat.sub && (
                      <div className="text-xs text-muted-foreground/70 mt-1">{stat.sub}</div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
