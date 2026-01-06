import { Phone, Mail, MapPin, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin } from "lucide-react";


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

  const legalLinks = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Policy", href: "#cookies" },
    { label: "Sitemap", href: "#sitemap" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">

      {/* Main Footer Section */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Airvault</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Leading the future of logistics with safe, reliable, and efficient
              transportation solutions across land, sea, and air.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>

                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>

                  <a
                    href={service.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 inline-block"
                  >
                    {service.label}
                  </a>
                </li>
              ))}

            </ul>
          </div>

          {/* NEW COLUMN — Contact Details */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Contact Details</h4>

            <ul className="space-y-4 text-primary-foreground/80">

              {/* Phone */}
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="font-medium">+91 83209 88001</p>
                  <p className="font-medium">+91 98790 97000</p>
                  <p className="text-sm text-primary-foreground/70">24/7 Support</p>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="font-medium">info@airvlt.com</p>
                  <p className="font-medium">pratik@airvlt.com</p>
                  <p className="text-sm text-primary-foreground/70">Quick Response</p>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <div>
                  <p className="font-medium">130, Mezzanine Floor</p>
                  <p className="text-sm text-primary-foreground/70">
                    Integrated Cargo Terminal, S.V. Patel International Airport
                  </p>
                  <p className="text-sm text-primary-foreground/70">
                    Ahmedabad, Gujarat – 380003
                  </p>
                </div>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Left Side - Text */}
            <p className="text-primary-foreground/70 text-sm">
              © 2026 Airvault. All rights reserved. Made with ❤️ for better logistics.
            </p>

            {/* Right Side - Social Icons */}
            <div className="flex items-center gap-4 pr-[5rem]">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/airvaultexpress?igsh=bGg2dzZpem15ZHQx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
              >
                <Instagram className="w-6 h-6" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/jet-cargoindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-secondary transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>

            </div>
          </div>
        </div>
      </div>


      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white text-primary hover:bg-gray-200 rounded-full shadow-large transition-all duration-300 hover:scale-110 z-40"
      >
        <ArrowUp className="w-6 h-6 mx-auto" />
      </button>


    </footer>
  );
};

export default Footer;
