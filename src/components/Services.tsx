import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plane, Ship, Truck, Package, FileCheck, Globe } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: any;
  features: string[];
}

const ServicesPage = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Air Freight",
      description: "Fast and reliable air cargo services for your time-sensitive shipments. Global reach with premium partners.",
      icon: Plane,
      features: ["Express Delivery", "Global Coverage", "Door-to-Door"],
    },
    {
      id: 2,
      title: "Ocean Freight",
      description: "Cost-effective sea freight solutions for large volumes. FCL and LCL services to major ports worldwide.",
      icon: Ship,
      features: ["FCL & LCL", "Port-to-Port", "Bulk Cargo"],
    },
    {
      id: 3,
      title: "Road Freight",
      description: "Comprehensive land transport networks ensuring efficient domestic and cross-border delivery.",
      icon: Truck,
      features: ["Nationwide", "Cross-border", "GPS Tracking"],
    },
    {
      id: 4,
      title: "Warehousing",
      description: "Secure storage solutions with modern inventory management systems for short and long-term needs.",
      icon: Package,
      features: ["24/7 Security", "Inventory Control", "Distribution"],
    },
    {
      id: 5,
      title: "Customs Clearance",
      description: "Expert handling of customs documentation and compliance to ensure smooth border transitions.",
      icon: FileCheck,
      features: ["Documentation", "Compliance", "Duty Consulting"],
    },
    {
      id: 6,
      title: "Supply Chain",
      description: "End-to-end supply chain optimization to streamline your tracking, logistics and reduce operational costs.",
      icon: Globe,
      features: ["Optimization", "Consulting", "Analytics"],
    },
  ];

  return (
    <section id="services" className="py-20 section-padding bg-gradient-subtle">
      <div className="container-custom">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Our Comprehensive Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tailored logistics solutions designed to meet distinct supply chain requirements with efficiency and reliability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="card-hover group overflow-hidden animate-scale-in border-0 shadow-lg bg-white flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header with Background Color */}
              <div className="relative h-64 flex flex-col items-center justify-center p-6 text-center bg-primary/10 group-hover:bg-primary/15 transition-colors">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {service.description}
                </p>
              </div>

              <CardContent className="flex-1 p-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground/80 uppercase tracking-wider">Key Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-auto group/btn border-primary/20 hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => window.location.href = '/services'}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
