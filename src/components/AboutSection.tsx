import { ArrowRight } from "lucide-react";
import aboutTeamImg from "../assets/about-team.jpg";

const AboutSection = () => {
    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h4
                        style={{ color: "hsl(var(--primary))" }}
                        className="font-bold uppercase tracking-widest text-sm mb-4"
                    >
                        About AirVault
                    </h4>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                        World Class <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-dark" style={{ color: "hsl(var(--primary))" }}>Logistics</span> Solutions
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side - Visuals */}
                    <div className="w-full lg:w-1/2 relative animate-slide-right">
                        {/* Decorative Dotted Pattern Background */}
                        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-50 -z-10"></div>

                        <div className="relative">
                            {/* Main Image (Top Left) */}
                            <div className="w-4/5 rounded-t-[3rem] rounded-bl-[3rem] overflow-hidden shadow-2xl relative z-10">
                                <img
                                    src={aboutTeamImg}
                                    alt="AirVault Team"
                                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Floating Badge */}
                            <div
                                className="absolute top-1/2 -left-6 lg:-left-12 transform -translate-y-1/2 z-30 animate-bounce"
                                style={{ animationDuration: "3s" }}
                            >
                                <div
                                    className="p-6 lg:p-8 rounded-tr-[2rem] rounded-bl-[2rem] shadow-xl text-white"
                                    style={{ backgroundColor: "hsl(var(--primary))" }}
                                >
                                    <div className="text-3xl lg:text-4xl font-bold mb-1">31k+</div>
                                    <div className="text-sm font-medium opacity-90 leading-tight">
                                        Products<br />Delivered
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Spacer for bottom overflow */}
                        <div className="h-16 lg:h-0"></div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full lg:w-1/2 animate-slide-left">
                        <div className="space-y-6">
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                At AirVault, we provide innovative and reliable logistics and transportation services that cater to businesses of all sizes. Our focus is on delivering seamless, cost-effective, and efficient solutions, ensuring your goods reach their destination safely and on time.
                            </p>

                            <p className="text-muted-foreground text-lg leading-relaxed">
                                We are committed to excellence in every aspect of our operations, our services span over a wide range of sectors, making us the trusted choice for companies looking to optimize their supply chain and improve overall efficiency.
                            </p>

                            <div className="pt-4">
                                <a
                                    href="/about"
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
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
