import { GraduationCap } from "lucide-react";
import navrachanaLogo from "@/assets/partners/Navrachana-University.png";
import spUniversityLogo from "@/assets/partners/SP-University.png";
import sigmaLogo from "@/assets/partners/Sigma-University.png";
import marwadiLogo from "@/assets/partners/Marwadi-University.png";
import parulLogo from "@/assets/partners/Parul-University.png";

const UniversityCollaborations = () => {
    const universities = [
        { name: "Parul University, Vadodara", logo: parulLogo },
        { name: "Marwadi University, Rajkot", logo: marwadiLogo },
        { name: "Sigma University, Vadodara", logo: sigmaLogo },
        { name: "Sardar Patel University, Anand", logo: spUniversityLogo },
        { name: "Navrachana University, Vadodara", logo: navrachanaLogo },
    ];

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container-custom relative z-10">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        University <span className="text-secondary">Collaborations</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Partnering with leading universities to build future-ready aviation professionals
                    </p>
                </div>

                <div className="overflow-hidden">
                    <div className="flex items-center animate-scroll-partners">
                        {/* Set 1 */}
                        <div className="flex items-center space-x-8 shrink-0 px-8">
                            {universities.map((uni, index) => (
                                <div
                                    key={`set1-${index}`}
                                    className="group bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center w-64 shrink-0 h-56 justify-center"
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {uni.logo ? (
                                            <img
                                                src={uni.logo}
                                                alt={uni.name}
                                                className="h-24 w-auto object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                                <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {uni.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Set 2 (Duplicate) */}
                        <div className="flex items-center space-x-8 shrink-0 px-8">
                            {universities.map((uni, index) => (
                                <div
                                    key={`set2-${index}`}
                                    className="group bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center w-64 shrink-0 h-56 justify-center"
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {uni.logo ? (
                                            <img
                                                src={uni.logo}
                                                alt={uni.name}
                                                className="h-24 w-auto object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                                <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {uni.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Set 3 (Duplicate) */}
                        <div className="flex items-center space-x-8 shrink-0 px-8">
                            {universities.map((uni, index) => (
                                <div
                                    key={`set3-${index}`}
                                    className="group bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center w-64 shrink-0 h-56 justify-center"
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {uni.logo ? (
                                            <img
                                                src={uni.logo}
                                                alt={uni.name}
                                                className="h-24 w-auto object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                                <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {uni.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Set 4 (Duplicate) */}
                        <div className="flex items-center space-x-8 shrink-0 px-8">
                            {universities.map((uni, index) => (
                                <div
                                    key={`set4-${index}`}
                                    className="group bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-medium transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center w-64 shrink-0 h-56 justify-center"
                                >
                                    <div className="flex flex-col items-center justify-center h-full">
                                        {uni.logo ? (
                                            <img
                                                src={uni.logo}
                                                alt={uni.name}
                                                className="h-24 w-auto object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                                <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        )}
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {uni.name}
                                        </h3>
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

export default UniversityCollaborations;
