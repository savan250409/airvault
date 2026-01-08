import { ShieldCheck, Settings, Globe, Headset } from "lucide-react";

/**
 * Features Section Component
 * Displays key service highlights in a 4-column grid layout
 * Each highlight is in its own card to match the requested design
 */
const FeaturesSection = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "Safe & Secure Product Delivery",
            description: "At AirVault, we prioritize the security and safety of your shipments. From pickup to delivery, our team ensures every product arrives in perfect condition.",
            color: "text-secondary"
        },
        {
            icon: Settings,
            title: "Highly Skilled Logistics Partners",
            description: "Our logistics network is powered by experienced professionals who understand the nuances of global shipping. Count on us for seamless and efficient delivery.",
            color: "text-secondary"
        },
        {
            icon: Globe,
            title: "Worldwide Product Delivery",
            description: "No matter where your product needs to go, we've got you covered. AirVault specializes in global delivery solutions that get your shipments where they need to be strictly reliable.",
            color: "text-secondary"
        },
        {
            icon: Headset,
            title: "Premium Logistics Support",
            description: "Our premium logistics services are designed to offer exceptional support at every stage of the delivery process. Trust us to handle your shipments with care and expertise.",
            color: "text-secondary"
        }
    ];

    return (
        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="container-custom">
                {/* 
                 * Grid Layout: 
                 * - Removed the single outer card wrapper
                 * - Added separate styling for each item to look like a card 
                 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-start space-y-4 border border-border/50 animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative mb-2">
                                    <Icon className={`w-12 h-12 ${feature.color}`} />
                                    {/* Small badge/dot overlay simulation from design */}
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-muted rounded-full opacity-50"></div>
                                </div>

                                <h3 className="text-xl font-bold text-foreground">
                                    {feature.title}
                                </h3>

                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
