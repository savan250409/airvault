import { Plane } from "lucide-react";

// Import available logos
import airIndiaLogo from "@/assets/partners/Air-India-Logo.png";
import emiratesLogo from "@/assets/partners/Emirates.png";
import lufthansaLogo from "@/assets/partners/Lufthansa.png";
import singaporeLogo from "@/assets/partners/Singapore-Airlines.png";
import qatarLogo from "@/assets/partners/Qatar-Airways.png";
import indigoLogo from "@/assets/partners/Indigo.png";
import etihadLogo from "@/assets/partners/Etihad-Airways.png";

const AssociatedAirlines = () => {
    const airlines = [
        { name: "Air India", logo: airIndiaLogo },
        { name: "IndiGo", logo: indigoLogo },
        { name: "Singapore Airlines", logo: singaporeLogo },
        { name: "Qatar Airways", logo: qatarLogo },
        { name: "Emirates", logo: emiratesLogo },
        { name: "Etihad Airways", logo: etihadLogo },
        { name: "Cathay Pacific", logo: null },
        { name: "Ethiopian Airlines", logo: null },
        { name: "Delta Airlines", logo: null },
        { name: "Kenya Airways", logo: null },
        { name: "VietJet Air", logo: null },
        { name: "SpiceJet", logo: null },
        { name: "Turkish Airlines", logo: null },
        { name: "Copa Airlines", logo: null },
        { name: "Lufthansa", logo: lufthansaLogo },
        { name: "Oman Air Cargo", logo: null },
        { name: "Air France", logo: null },
    ];

    return (
        <section className="py-16 bg-muted/30">
            <div className="container-custom">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Associated <span className="text-primary">Airlines</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Connecting you to the world with our premium airline partners
                    </p>
                </div>

                <div className="overflow-hidden">
                    <div className="flex items-center animate-scroll-fast">
                        {/* Set 1 */}
                        <div className="flex items-center space-x-6 shrink-0 px-3">
                            {airlines.map((airline, index) => (
                                <div
                                    key={`set1-${index}`}
                                    className="bg-card shrink-0 w-64 hover:shadow-medium border border-border/50 rounded-xl p-6 flex flex-col items-center justify-center h-32 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="flex flex-col items-center justify-center h-full w-full">
                                        {airline.logo ? (
                                            <img
                                                src={airline.logo}
                                                alt={airline.name}
                                                className="h-12 w-auto object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <Plane className="w-8 h-8 text-primary/40 mb-2 group-hover:text-primary transition-colors" />
                                            </div>
                                        )}
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm text-center">
                                            {airline.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Set 2 (Duplicate) */}
                        <div className="flex items-center space-x-6 shrink-0 px-3">
                            {airlines.map((airline, index) => (
                                <div
                                    key={`set2-${index}`}
                                    className="bg-card shrink-0 w-64 hover:shadow-medium border border-border/50 rounded-xl p-6 flex flex-col items-center justify-center h-32 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="flex flex-col items-center justify-center h-full w-full">
                                        {airline.logo ? (
                                            <img
                                                src={airline.logo}
                                                alt={airline.name}
                                                className="h-12 w-auto object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <Plane className="w-8 h-8 text-primary/40 mb-2 group-hover:text-primary transition-colors" />
                                            </div>
                                        )}
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm text-center">
                                            {airline.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Set 3 (Duplicate) */}
                        <div className="flex items-center space-x-6 shrink-0 px-3">
                            {airlines.map((airline, index) => (
                                <div
                                    key={`set3-${index}`}
                                    className="bg-card shrink-0 w-64 hover:shadow-medium border border-border/50 rounded-xl p-6 flex flex-col items-center justify-center h-32 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="flex flex-col items-center justify-center h-full w-full">
                                        {airline.logo ? (
                                            <img
                                                src={airline.logo}
                                                alt={airline.name}
                                                className="h-12 w-auto object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <Plane className="w-8 h-8 text-primary/40 mb-2 group-hover:text-primary transition-colors" />
                                            </div>
                                        )}
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm text-center">
                                            {airline.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Set 4 (Duplicate) */}
                        <div className="flex items-center space-x-6 shrink-0 px-3">
                            {airlines.map((airline, index) => (
                                <div
                                    key={`set4-${index}`}
                                    className="bg-card shrink-0 w-64 hover:shadow-medium border border-border/50 rounded-xl p-6 flex flex-col items-center justify-center h-32 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="flex flex-col items-center justify-center h-full w-full">
                                        {airline.logo ? (
                                            <img
                                                src={airline.logo}
                                                alt={airline.name}
                                                className="h-12 w-auto object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <Plane className="w-8 h-8 text-primary/40 mb-2 group-hover:text-primary transition-colors" />
                                            </div>
                                        )}
                                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm text-center">
                                            {airline.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AssociatedAirlines;
