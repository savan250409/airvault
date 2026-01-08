import { useState, useEffect } from "react";
import { ArrowRight, Plane, Ship, Truck, Package, Warehouse, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BASE_URI from "@/config";

// Import images
import airTransportImg from "@/assets/air-transport.jpg";
import seaTransportImg from "@/assets/sea-transport.jpg";
import landTransportImg from "@/assets/land-transport.jpg";
import warehousingImg from "@/assets/warehousing-service.png";
import customsImg from "@/assets/customs-clearance.png";
import supplyChainImg from "@/assets/supply-chain.png";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  details: string;
  image: string;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Static service data matching the screenshot style content
  const staticServices = [
    {
      id: "1",
      title: "Air Freight",
      description: "Fast and reliable air cargo solutions for time-sensitive shipments worldwide.",
      features: ["Global coverage", "Express delivery", "Real-time tracking", "Secure handling"],
      details: "Our air freight services provide expedited shipping solutions with competitive rates and comprehensive tracking capabilities.",
      image: airTransportImg
    },
    {
      id: "2",
      title: "Sea Freight",
      description: "Cost-effective ocean freight for bulk cargo and container shipments.",
      features: ["FCL & LCL options", "Port-to-port", "Customs assistance", "Bulk shipping"],
      details: "Ideal for heavy or large volume shipments, offering economical solutions with full container and less than container load options.",
      image: seaTransportImg
    },
    {
      id: "3",
      title: "Nomination Cargo Handling",
      description: "End-to-end coordination for pre-selected carrier shipments.",
      features: ["Smooth documentation", "Cargo supervision", "Compliance handling", "Seamless communication"],
      details: "Nomination Cargo Handling provides end-to-end coordination for shipments where carriers, routes, or partners are pre-selected by the client. We ensure smooth documentation, cargo supervision, compliance handling, and seamless communication between all stakeholders to guarantee timely and secure cargo movement.",
      image: landTransportImg
    },
    {
      id: "4",
      title: "Express Delivery",
      description: "Priority delivery services for urgent packages and documents.",
      features: ["Next-day delivery", "Document handling", "Signature required", "Insurance included"],
      details: "Premium express service with guaranteed delivery times and complete package protection.",
      image: supplyChainImg
    },
    {
      id: "5",
      title: "Warehousing",
      description: "Secure storage and inventory management solutions.",
      features: ["Climate control", "Inventory management", "Order fulfillment", "Security 24/7"],
      details: "State-of-the-art warehousing facilities with advanced security systems and inventory management technology.",
      image: warehousingImg
    },
    {
      id: "6",
      title: "Custom Clearance",
      description: "Expert customs brokerage and compliance services.",
      features: ["Documentation", "Tax calculation", "Regulatory compliance", "Duty optimization"],
      details: "Professional customs clearance services ensuring smooth cross-border transactions and compliance with regulations.",
      image: customsImg
    }
  ];

  useEffect(() => {
    // Only use static data for now
    setServices(staticServices);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading services...</div>;
  }

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "7s" }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "9s", animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-primary/90"></div>
          <div className="container-custom relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              Our <span className="text-secondary">Services</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Comprehensive logistics solutions tailored to meet your business needs with reliability, efficiency, and global reach.
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Comprehensive <span className="text-primary">Services</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We offer a wide range of logistics solutions designed to streamline your supply chain and enhance operational efficiency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-0 shadow-md animate-fade-in overflow-hidden h-full flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Header Area with Background Image */}
                  <div className="relative h-64 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Neutral Overlay to remove blue tint but keep text readable */}
                    <div
                      className="absolute inset-0 transition-colors group-hover:bg-black/70"
                      style={{ backgroundColor: "#00000080" }}
                    ></div>

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{service.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed max-w-xs mx-auto">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <CardContent className="flex-1 space-y-6 pt-8 pb-8 px-6 flex flex-col">
                    {/* Features List */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-800 text-base">
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-slate-600">
                            {/* Orange Bullet Point */}
                            <span className="min-w-[6px] min-h-[6px] w-[6px] h-[6px] rounded-full bg-orange-400 mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Details Section */}
                    {/* Separator Line */}
                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {service.details}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">5k+</h3>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">99.5%</h3>
                <p className="text-muted-foreground">On-Time Delivery</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
                <p className="text-muted-foreground">Countries Served</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
                <p className="text-muted-foreground">Customer Support</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div >
    </div >
  );
};

export default ServicesPage;