import { Phone, Mail, MapPin, ArrowUp, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Contact", href: "/contact" }
  ];

  const services = [
    { label: "Air Freight", href: "/services" },
    { label: "Sea Freight", href: "/services" },
    { label: "Land Transport", href: "/services" },
    { label: "Express Delivery", href: "/services" },
    { label: "Warehousing", href: "/services" },
    { label: "Custom Clearance", href: "/services" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">

          {/* Company */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Airvault</h3>
            <p className="text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
              Leading the future of logistics with safe, reliable, and efficient
              transportation solutions across land, sea, and air.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i} className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  <a href={link.href} className="text-sm sm:text-base hover:text-secondary transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, i) => (
                <li key={i} className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  <a href={service.href} className="text-sm sm:text-base hover:text-secondary transition">
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-semibold">Contact Details</h4>

            <ul className="space-y-4 text-sm sm:text-base">

              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <Phone className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p>+91 83209 88001</p>
                  <p>+91 98790 97000</p>
                  <p className="text-xs text-primary-foreground/70">24/7 Support</p>
                </div>
              </li>

              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <Mail className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p>info@airvlt.com</p>
                  <p>pratik@airvlt.com</p>
                  <p className="text-xs text-primary-foreground/70">Quick Response</p>
                </div>
              </li>

              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p>130, Mezzanine Floor</p>
                  <p className="text-xs text-primary-foreground/70">
                    Integrated Cargo Terminal, S.V. Patel International Airport
                  </p>
                  <p className="text-xs text-primary-foreground/70">
                    Ahmedabad, Gujarat – 380003
                  </p>
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Text */}
            <p className="text-xs sm:text-sm text-primary-foreground/70 text-center md:text-left">
              © 2026 Airvault. All rights reserved. Made with ❤️ for better logistics.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-secondary">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:text-secondary">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-white text-primary rounded-full shadow-lg hover:scale-110 transition"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 mx-auto" />
      </button>

    </footer>
  );
};

export default Footer;