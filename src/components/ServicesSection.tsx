import { ArrowRight } from "lucide-react";
import airFreightImg from "../assets/air-freight.jpg";
import seaFreightImg from "../assets/sea-transport.jpg";
import roadFreightImg from "../assets/land-transport.jpg";

interface ServicesSectionProps {
    limit?: number;
}

const ServicesSection = ({ limit }: ServicesSectionProps) => {
    const services = [
        {
            id: 1,
            title: "Air Freight",
            description: "Fast and reliable air cargo services for your time-sensitive shipments. Global reach with premium partners.",
            image: airFreightImg,
            features: ["Express Delivery", "Global Coverage", "Door-to-Door"],
        },
        {
            id: 2,
            title: "Ocean Freight",
            description: "Cost-effective sea freight solutions for large volumes. FCL and LCL services to major ports worldwide.",
            image: seaFreightImg,
            features: ["FCL & LCL", "Port-to-Port", "Bulk Cargo"],
        },
        {
            id: 3,
            title: "Road Freight",
            description: "Comprehensive land transport networks ensuring efficient domestic and cross-border delivery.",
            image: roadFreightImg,
            features: ["Nationwide", "Cross-border", "GPS Tracking"],
        },
    ];

    const displayedServices = limit ? services.slice(0, limit) : services;

    return (
        <section className="py-20 bg-background">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Our <span className="text-primary">Comprehensive Services</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        We offer a wide range of logistics solutions designed to streamline your supply chain and enhance operational efficiency.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedServices.map((service, index) => (
                        <div
                            key={service.id}
                            className="group bg-card rounded-xl overflow-hidden border border-border/50 shadow-medium hover:shadow-large transition-all duration-300 flex flex-col animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Image Header */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 z-10" />
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 bg-black/20">
                                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/90 text-sm font-medium max-w-xs drop-shadow-md">
                                        {service.description}
                                    </p>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-8 flex-grow flex flex-col bg-card">
                                <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Key Features</h4>

                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                                            <span className="w-1.5 h-1.5 bg-secondary rounded-sm mr-3 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Read More Button */}
                <div className="mt-16 text-center animate-fade-in">
                    <a
                        href="/services"
                        style={{ backgroundColor: "hsl(var(--primary))" }}
                        className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        Read More
                        <div className="bg-white/20 p-1 rounded-full">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
