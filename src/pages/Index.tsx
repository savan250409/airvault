import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PartnersSection from "@/components/PartnersSection";
import StatsSection from "@/components/StatsSection";
import BlogSection from "@/components/BlogSection";
import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";

import AssociatedAirlines from "@/components/AssociatedAirlines";
import UniversityCollaborations from "@/components/UniversityCollaborations";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }}></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/2 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "12s", animationDelay: "4s" }}></div>
      </div>

      <div className="relative z-10">
        <Header />
        <Hero />
        <FeaturesSection />
        <PartnersSection />
        <AboutSection />
        <AssociatedAirlines />
        <ServicesSection limit={3} />
        <StatsSection />
        <UniversityCollaborations />
        {/* <CaseStudies /> 
        <BlogSection /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
