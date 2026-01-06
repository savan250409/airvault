import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import airTransport from "@/assets/air-transport.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";

const CaseStudiesPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const caseStudies = [
    {
      id: 1,
      slug: "global-electronics-distribution",
      title: "Global Electronics Distribution",
      category: "Air Freight",
      image: airTransport,
      challenge:
        "Urgent delivery of high-value electronics to 15 countries within 48 hours for product launch",
      tags: ["Express", "International", "Electronics"],
    },
    {
      id: 2,
      slug: "automotive-parts-supply-chain",
      title: "Automotive Parts Supply Chain",
      category: "Land Transport",
      image: landTransport,
      challenge:
        "Establish reliable just-in-time delivery system for automotive parts across 3 countries",
      tags: ["Automotive", "JIT", "Cross-border"],
    },
    {
      id: 3,
      slug: "pharmaceutical-cold-chain",
      title: "Pharmaceutical Cold Chain",
      category: "Sea Freight",
      image: seaTransport,
      challenge:
        "Transport temperature-sensitive medications maintaining 2-8°C across continents",
      tags: ["Pharmaceutical", "Cold Chain", "Compliance"],
    },
    {
      id: 4,
      slug: "ecommerce-fulfillment-expansion",
      title: "E-commerce Fulfillment Expansion",
      category: "Warehousing",
      image: landTransport,
      challenge:
        "Scale fulfillment operations for 300% growth in online orders during peak season",
      tags: ["E-commerce", "Fulfillment", "Automation"],
    },
    {
      id: 5,
      slug: "energy-equipment-project",
      title: "Energy Equipment Project",
      category: "Project Cargo",
      image: seaTransport,
      challenge:
        "Transport oversized wind turbine components to remote installation sites",
      tags: ["Project Cargo", "Renewable Energy", "Heavy Lift"],
    },
    {
      id: 6,
      slug: "fashion-retail-seasonal-distribution",
      title: "Fashion Retail Seasonal Distribution",
      category: "Express Delivery",
      image: airTransport,
      challenge:
        "Distribute seasonal fashion collection to 200+ retail stores before launch date",
      tags: ["Fashion", "Retail", "Seasonal"],
    },
    {
      id: 7,
      slug: "luxury-goods-security-transport",
      title: "Luxury Goods Security Transport",
      category: "Air Freight",
      image: airTransport,
      challenge: "High-value luxury items need secure transport across continents",
      tags: ["Luxury", "Security", "Express"],
    },
    {
      id: 8,
      slug: "agricultural-exports",
      title: "Agricultural Exports",
      category: "Sea Freight",
      image: seaTransport,
      challenge: "Seasonal perishable goods require freshness preservation",
      tags: ["Agriculture", "Cold Chain", "Exports"],
    },
    {
      id: 9,
      slug: "tech-startup-scaling",
      title: "Tech Startup Scaling",
      category: "Express",
      image: landTransport,
      challenge: "Need rapid global distribution for new IoT devices",
      tags: ["Tech", "Express", "Innovation"],
    },
    {
      id: 10,
      slug: "healthcare-relief-supplies",
      title: "Healthcare Relief Supplies",
      category: "Air + Land",
      image: airTransport,
      challenge: "Emergency supplies to disaster zones",
      tags: ["Healthcare", "Relief", "Emergency"],
    },
  ];

  const itemsPerPage = 9;
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage);

  const currentItems = caseStudies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{animationDuration: "7s"}}></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{animationDuration: "9s", animationDelay: "2s"}}></div>
      </div>
      
      <div className="relative z-10">
        <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/90 to-blue-700/80 text-center text-white overflow-hidden">
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Case <span className="text-secondary">Studies</span>
          </h1>
          <p
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Explore how we deliver world-class logistics solutions and transform
            business challenges into success stories.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentItems.map((study, index) => (
              <Card
                key={study.id}
                className="overflow-hidden bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div
                  className="relative group cursor-pointer"
                  onClick={() => navigate(`/case-study/${study.slug}`)}
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-56 object-cover transform transition-transform duration-500 group-active:scale-110"
                  />
                </div>

                {/* Title + Content */}
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {study.title}
                  </h3>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {study.challenge}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 border rounded-full border-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
      </div>
    </div>
  );
};

export default CaseStudiesPage;
