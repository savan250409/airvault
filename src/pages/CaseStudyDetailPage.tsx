import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, TrendingUp, Clock, Award, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import airTransport from "@/assets/air-transport.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";

const caseStudies = [
  {
    id: "1",
    slug: "global-electronics-distribution",
    title: "Global Electronics Distribution",
    client: "TechCorp International",
    category: "Air Freight",
    image: airTransport,
    challenge: "TechCorp needed to launch a new flagship product across 15 countries simultaneously. The challenge was coordinating urgent delivery of high-value electronics worth $2.5M within a strict 48-hour window, ensuring zero damage and maintaining product security throughout the journey.",
    solution: "We designed a comprehensive multi-destination air freight solution with priority handling at every touchpoint. Our team coordinated with multiple airports, implemented real-time GPS tracking, and assigned dedicated logistics managers for each region. Special climate-controlled packaging was used to protect sensitive electronics.",
    results: [
      "100% on-time delivery across all 15 destinations",
      "Zero damage incidents reported",
      "30% cost savings compared to competitor quotes",
      "Real-time visibility throughout transit",
      "Successful product launch achieved"
    ],
    duration: "2 days",
    locations: "15 countries",
    value: "$2.5M shipment value",
    tags: ["Express", "International", "Electronics"],
    testimonial: "Airvault's exceptional coordination made our global product launch flawless. Their attention to detail and real-time tracking gave us complete peace of mind.",
    testimonialAuthor: "Sarah Chen, VP of Operations at TechCorp"
  },
  {
    id: "2",
    slug: "automotive-parts-supply-chain",
    title: "Automotive Parts Supply Chain",
    client: "AutoManufacture Ltd",
    category: "Land Transport",
    image: landTransport,
    challenge: "AutoManufacture required a reliable just-in-time delivery system for critical automotive parts across three countries. Production delays due to late deliveries were costing millions annually. The solution needed to handle 500+ daily shipments with 99%+ accuracy.",
    solution: "We implemented a dedicated route optimization system with GPS tracking and predictive logistics algorithms. Our network of strategically located distribution centers enabled faster deliveries. Real-time data integration with their ERP system provided complete visibility and automated reordering.",
    results: [
      "45% reduction in inventory holding costs",
      "99.9% delivery accuracy rate maintained",
      "Real-time visibility across entire supply chain",
      "Production downtime reduced by 60%",
      "Annual savings of $3.2M achieved"
    ],
    duration: "Ongoing partnership - 2+ years",
    locations: "3 countries",
    value: "500+ daily shipments",
    tags: ["Automotive", "JIT", "Cross-border"],
    testimonial: "The partnership with Airvault transformed our supply chain efficiency. Their predictive logistics have virtually eliminated production delays.",
    testimonialAuthor: "Michael Rodriguez, Supply Chain Director"
  },
  {
    id: "3",
    slug: "pharmaceutical-cold-chain",
    title: "Pharmaceutical Cold Chain",
    client: "PharmaCare Solutions",
    category: "Sea Freight",
    image: seaTransport,
    challenge: "PharmaCare needed to transport temperature-sensitive medications worth over $10M across five continents while maintaining strict 2-8°C temperature requirements. Regulatory compliance and documentation were critical, with zero tolerance for temperature deviations.",
    solution: "We deployed specialized reefer containers with redundant cooling systems and continuous IoT temperature monitoring. Our cold chain specialists managed all regulatory documentation and compliance requirements. Backup power systems and 24/7 monitoring ensured uninterrupted temperature control.",
    results: [
      "100% temperature compliance throughout transit",
      "All regulatory approvals maintained",
      "50% cost reduction vs air freight alternative",
      "Zero product loss or degradation",
      "Complete audit trail for compliance"
    ],
    duration: "3 months",
    locations: "5 continents",
    value: "$10M+ cargo value",
    tags: ["Pharmaceutical", "Cold Chain", "Compliance"],
    testimonial: "Airvault's cold chain expertise and meticulous documentation made our international pharmaceutical distribution seamless and compliant.",
    testimonialAuthor: "Dr. Lisa Park, Logistics Manager"
  }
];

const CaseStudyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const caseStudy = caseStudies.find(study => study.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Button onClick={() => navigate("/case-study")}>
            Back to Case Studies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s" }}></div>
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "7s", animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section - Split Layout */}
        <section className="section-padding bg-background overflow-hidden">
          <div className="container-custom">
            <Button
              variant="ghost"
              className="mb-8 hover:bg-primary/10 animate-fade-in"
              onClick={() => navigate("/case-study")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Button>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div className="space-y-6 animate-fade-in">
                <Badge className="bg-primary text-primary-foreground text-sm px-4 py-2">
                  {caseStudy.category}
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  {caseStudy.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {caseStudy.client} - Transforming logistics operations through innovative solutions and strategic planning.
                </p>

                <Button
                  size="lg"
                  className="btn-gradient-primary text-lg px-8 hover-scale"
                  onClick={() => navigate("/contact")}
                >
                  Get Started
                </Button>
              </div>

              {/* Right: Image with decorative circle */}
              <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-75"></div>
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-elegant">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Info Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="grid md:grid-cols-4 gap-8 animate-fade-in">
              <Card className="p-8 text-center hover:shadow-medium transition-shadow">
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Client</p>
                <p className="text-xl font-bold text-foreground">{caseStudy.client}</p>
              </Card>
              <Card className="p-8 text-center hover:shadow-medium transition-shadow">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Timeline</p>
                <p className="text-xl font-bold text-foreground">{caseStudy.duration}</p>
              </Card>
              <Card className="p-8 text-center hover:shadow-medium transition-shadow">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Locations</p>
                <p className="text-xl font-bold text-foreground">{caseStudy.locations}</p>
              </Card>
              <Card className="p-8 text-center hover:shadow-medium transition-shadow">
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Value</p>
                <p className="text-xl font-bold text-foreground">{caseStudy.value}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* The Challenge Section - Image Left, Text Right */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image */}
              <div className="relative animate-slide-left">
                <div className="absolute -inset-4 bg-gradient-primary opacity-20 rounded-full blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-large">
                  <img
                    src={caseStudy.image}
                    alt="Challenge"
                    className="w-full h-[450px] object-cover"
                  />
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-6 animate-slide-right">
                <h2 className="text-primary text-lg font-bold uppercase tracking-wider">
                  The Challenge
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Overcoming Complex Logistics Obstacles
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution Section - Text Left, Image Right */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div className="space-y-6 animate-slide-left">
                <h2 className="text-primary text-lg font-bold uppercase tracking-wider">
                  Our Solution
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Strategic Implementation & Innovation
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {caseStudy.solution}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  {caseStudy.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-base px-4 py-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative animate-slide-right lg:order-last">
                <div className="absolute -inset-4 bg-gradient-secondary opacity-20 rounded-full blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-large">
                  <img
                    src={landTransport}
                    alt="Solution"
                    className="w-full h-[450px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-primary text-lg font-bold uppercase tracking-wider mb-4">
                Results Achieved
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Measurable Success & Impact
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudy.results.map((result, i) => (
                <Card
                  key={i}
                  className="p-8 hover:shadow-large transition-all duration-300 group border-t-4 border-t-success animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-7 h-7 text-success" />
                      </div>
                    </div>
                    <p className="text-lg text-foreground font-medium leading-relaxed">
                      {result}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Gallery Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-primary text-lg font-bold uppercase tracking-wider mb-4">
                Project Gallery
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Visual Highlights
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group animate-fade-in">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"></div>
                <img
                  src={caseStudy.image}
                  alt="Gallery 1"
                  className="w-full h-[350px] object-cover rounded-2xl shadow-medium group-hover:shadow-large transition-shadow"
                />
              </div>
              <div className="relative group animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"></div>
                <img
                  src={seaTransport}
                  alt="Gallery 2"
                  className="w-full h-[350px] object-cover rounded-2xl shadow-medium group-hover:shadow-large transition-shadow"
                />
              </div>
              <div className="relative group animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"></div>
                <img
                  src={landTransport}
                  alt="Gallery 3"
                  className="w-full h-[350px] object-cover rounded-2xl shadow-medium group-hover:shadow-large transition-shadow"
                />
              </div>
              <div className="relative group animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"></div>
                <img
                  src={airTransport}
                  alt="Gallery 4"
                  className="w-full h-[350px] object-cover rounded-2xl shadow-medium group-hover:shadow-large transition-shadow"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <Card className="p-12 md:p-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-none shadow-large animate-fade-in">
                <div className="text-center space-y-8">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-elegant">
                    <Award className="w-10 h-10 text-white" />
                  </div>

                  <div className="text-6xl text-primary/30 font-serif leading-none">"</div>

                  <blockquote className="text-2xl md:text-3xl text-foreground leading-relaxed font-medium italic">
                    {caseStudy.testimonial}
                  </blockquote>

                  <div className="pt-6 border-t border-border">
                    <p className="text-xl font-bold text-foreground mb-1">
                      {caseStudy.testimonialAuthor}
                    </p>
                    <p className="text-muted-foreground">
                      {caseStudy.client}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-primary text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                <TrendingUp className="w-12 h-12" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Ready to Write Your Success Story?
              </h2>

              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Let's discuss how we can transform your logistics operations and deliver exceptional results for your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 hover-scale font-semibold"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary font-semibold"
                  onClick={() => navigate("/case-study")}
                >
                  View More Case Studies
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudyDetailPage;
