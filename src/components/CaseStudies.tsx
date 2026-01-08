import { TrendingUp, ArrowRight, Award, Users, Globe, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import airTransport from "@/assets/air-transport.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";

const CaseStudies = () => {
  const navigate = useNavigate();
  const caseStudies = [
    {
      id: "1",
      slug: "global-electronics-distribution",
      title: "Global Electronics Distribution",
      client: "TechCorp International",
      industry: "Technology",
      challenge: "Urgent delivery of high-value electronics to 15 countries within 48 hours",
      solution: "Coordinated multi-destination air freight with priority handling",
      results: ["100% on-time delivery", "Zero damage incidents", "30% cost savings"],
      image: airTransport
    },
    {
      id: "2",
      slug: "automotive-parts-supply-chain",
      title: "Automotive Parts Supply Chain",
      client: "AutoManufacture Ltd",
      industry: "Automotive",
      challenge: "Just-in-time delivery system for automotive parts across 3 countries",
      solution: "Dedicated route optimization with GPS tracking and predictive logistics",
      results: ["45% inventory cost reduction", "99.9% delivery accuracy", "Real-time visibility"],
      image: landTransport
    },
    {
      id: "3",
      slug: "pharmaceutical-cold-chain",
      title: "Pharmaceutical Cold Chain",
      client: "PharmaCare Solutions",
      industry: "Healthcare",
      challenge: "Temperature-sensitive medications maintaining 2-8°C across continents",
      solution: "Specialized reefer containers with continuous temperature monitoring",
      results: ["100% temperature compliance", "50% cost reduction", "Zero product loss"],
      image: seaTransport
    }
  ];

  const additionalMetrics = [
    { value: "500+", label: "Successful Projects", icon: Award },
    { value: "99.9%", label: "Client Retention", icon: Users },
    { value: "$50M+", label: "Cost Savings", icon: BarChart3 },
    { value: "150+", label: "Countries Served", icon: Globe }
  ];

  return (
    <section id="case-study" className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <div className="inline-block">
            <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold border border-secondary/20">
              Success Stories
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="text-foreground">Case</span>{" "}
            <span className="text-[#0B41E3]">Studies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real results from real clients transforming their logistics operations.
          </p>
        </div>

        <Carousel
          className="w-full max-w-5xl mx-auto mb-16"
          plugins={[Autoplay({ delay: 5000 })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {caseStudies.map((study) => (
              <CarouselItem key={study.id}>
                <Card className="overflow-hidden card-hover group">
                  <div className="relative h-64">
                    <img
                      src={study.image}
                      alt={study.client}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{study.client}</h3>
                      <p className="text-sm text-white/80">{study.industry}</p>
                    </div>
                  </div>

                  <CardContent className="p-8 space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Challenge</h4>
                      <p className="text-muted-foreground text-sm">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">Solution</h4>
                      <p className="text-muted-foreground text-sm">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-primary mb-2">Results</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <TrendingUp className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline-animated"
                      className="mt-6 w-full"
                      onClick={() => navigate(`/case-study/${study.slug}`)}
                    >
                      View Full Case Study
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="grid md:grid-cols-4 gap-6 animate-slide-up">
          {additionalMetrics.map((metric, index) => (
            <Card
              key={index}
              className="p-6 text-center card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <metric.icon className="w-8 h-8 mx-auto mb-3 text-secondary" />
              <div className="text-3xl font-bold text-[#0B41E3] mb-2">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
