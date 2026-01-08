import { CheckCircle, Users, Globe, Award, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import aboutTeamImage from "@/assets/about-team.jpg";

const About = () => {
  const achievements = [
    { icon: Users, value: "5k+", label: "Happy Clients" },
    { icon: Globe, value: "150+", label: "Countries Served" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: TrendingUp, value: "99.9%", label: "Success Rate" }
  ];

  const features = [
    "Advanced GPS tracking system",
    "24/7 customer support",
    "Comprehensive insurance coverage",
    "Real-time shipment updates",
    "Secure warehouse facilities",
    "Expert logistics team",
    "Competitive pricing",
    "Environmental sustainability"
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-left">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold border border-secondary/20">
                  About Our Company
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gradient-primary">Safe Logistic &</span>
                <br />
                <span className="text-foreground">Transport Solutions</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Airvault delivers world-class logistics solutions with flexible,
                convenient, and comprehensive services. We specialize in providing
                reliable transportation across land, sea, and air with unlimited
                customization possibilities to meet your unique requirements.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Our commitment to excellence drives us to provide innovative logistics
                solutions that save valuable time and resources while ensuring the
                safety and security of your cargo throughout the entire transportation process.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" variant="gradient-primary">
                More About Us
              </Button>
              <Button size="lg" variant="outline-animated">
                Our Portfolio
              </Button>
            </div>
          </div>

          {/* Right Content - Image and Stats */}
          <div className="space-y-8 animate-slide-right">
            <div className="relative">
              <img
                src={aboutTeamImage}
                alt="Professional logistics team"
                className="w-full rounded-2xl shadow-large"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-primary text-primary-foreground p-6 rounded-xl shadow-large">
                <Shield className="w-8 h-8 mb-2" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Secure Delivery</div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="p-6 text-center card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <achievement.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-gradient-primary mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <Card className="p-8 card-hover bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="space-y-4 p-0">
              <h3 className="text-2xl font-bold text-gradient-primary">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To act as an indispensable partner to our clients by helping them build
                and maximize sustainable competitive advantages through expertly crafted
                and reliably delivered logistics solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 card-hover bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="space-y-4 p-0">
              <h3 className="text-2xl font-bold text-gradient-primary">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading global logistics provider, known for innovation,
                reliability, and exceptional customer service while contributing to
                sustainable transportation solutions worldwide.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default About;