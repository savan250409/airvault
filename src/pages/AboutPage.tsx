import { CheckCircle, Users, Globe, Award, TrendingUp, Shield, Target, Heart, Zap, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import aboutTeamImage from "@/assets/about-team.jpg";

const AboutPage = () => {
  const achievements = [
    { icon: Users, value: "10,000+", label: "Happy Clients", color: "text-primary" },
    { icon: Globe, value: "50+", label: "Countries Served", color: "text-secondary" },
    { icon: Award, value: "15+", label: "Years Experience", color: "text-primary" },
    { icon: TrendingUp, value: "99.8%", label: "Success Rate", color: "text-secondary" }
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

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Committed to delivering the highest quality logistics services with attention to every detail."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your success is our priority. We build lasting relationships through exceptional service."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Embracing cutting-edge technology to provide efficient and reliable logistics solutions."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Your cargo's safety is paramount. We ensure secure handling throughout the journey."
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }}></div>
        <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-secondary/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s", animationDelay: "1s" }}></div>
      </div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-primary/90"></div>
          <div className="container-custom relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              About <span className="text-secondary">Airvault</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Your trusted partner in global logistics, delivering excellence across land, sea, and air.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
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
                    <span className="text-[#0B41E3]">Safe Logistic &</span>
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

                {/* <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button size="lg" variant="gradient-primary">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline-animated">
                    View Portfolio
                  </Button>
                </div> */}
              </div>

              {/* Right Content - Image and Stats */}
              <div className="space-y-8 animate-slide-right">
                <div className="relative">
                  <img
                    src={aboutTeamImage}
                    alt="Professional logistics team"
                    className="w-full rounded-2xl shadow-large"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-gradient-primary text-primary-foreground p-6 rounded-xl shadow-large animate-float">
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
                      <achievement.icon className={`w-8 h-8 mx-auto mb-3 ${achievement.color}`} />
                      <div className="text-2xl font-bold text-[#0B41E3] mb-1">
                        {achievement.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{achievement.label}</div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-gradient-subtle">
          <div className="container-custom">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Our <span className="text-[#0B41E3]">Core Values</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-6 text-center card-hover animate-scale-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8">

              {/* Mission Box - SAME */}
              <Card className="p-8 card-hover bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-slide-left">
                <CardContent className="space-y-4 p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B41E3]">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To act as an indispensable partner to our clients by helping them build
                    and maximize sustainable competitive advantages through expertly crafted
                    and reliably delivered logistics solutions.
                  </p>
                </CardContent>
              </Card>

              {/* Vision Box - ONLY COLORS CHANGED, NOTHING REMOVED */}
              <Card className="p-8 card-hover bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 animate-slide-right">
                <CardContent className="space-y-4 p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B41E3]">Our Vision</h3>
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

        {/* CTA Section */}
        {/* <section className="section-padding bg-gradient-primary text-primary-foreground">
          <div className="container-custom text-center">
            <Clock className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Join thousands of satisfied clients who trust Airvlt for their shipping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" variant="gradient-secondary">
                Get Quote Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </section> */}
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
