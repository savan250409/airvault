import { useEffect, useRef, useState } from "react";
import { Truck, Ship, Clock, Shield } from "lucide-react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    deliveries: 0,
    routes: 0,
    onTime: 0,
    secure: 0
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Truck,
      target: 50000,
      label: "Deliveries",
      suffix: "+",
      color: "text-primary"
    },
    {
      icon: Ship,
      target: 150,
      label: "Sea Routes",
      suffix: "+",
      color: "text-secondary"
    },
    {
      icon: Clock,
      target: 99.5,
      label: "On Time",
      suffix: "%",
      color: "text-primary"
    },
    {
      icon: Shield,
      target: 100,
      label: "Secure",
      suffix: "%",
      color: "text-secondary"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const animateCounters = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setCounts({
          deliveries: Math.floor(stats[0].target * easeOutQuart),
          routes: Math.floor(stats[1].target * easeOutQuart),
          onTime: Math.floor(stats[2].target * easeOutQuart),
          secure: Math.floor(stats[3].target * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounts({
            deliveries: stats[0].target,
            routes: stats[1].target,
            onTime: stats[2].target,
            secure: stats[3].target
          });
        }
      }, stepDuration);
    };

    animateCounters();
  }, [isVisible]);

  const getCountValue = (index: number) => {
    const countKeys = ['deliveries', 'routes', 'onTime', 'secure'] as const;
    return counts[countKeys[index]];
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-primary text-primary-foreground"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <div className="inline-block">
            <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
              Our Achievements
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Key Statistics
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Numbers that reflect our commitment to excellence and reliability in logistics services
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const countValue = getCountValue(index);

            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-white/20 p-4 rounded-full group-hover:bg-white/30 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Counter */}
                  <div className="mb-4">
                    <span className="text-4xl lg:text-5xl font-bold text-white">
                      {countValue.toLocaleString()}
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold text-secondary ml-1">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="text-white/80 text-lg font-semibold">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Text */}
        <div className="text-center mt-16 animate-slide-up">
          <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            These numbers represent years of dedication, countless satisfied customers,
            and our unwavering commitment to providing world-class logistics solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;