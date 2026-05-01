import { useEffect, useRef, useState } from "react";
import { Truck, Plane, Clock, Shield } from "lucide-react";

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
    { icon: Truck, target: 31000, label: "Deliveries", suffix: "+" },
    { icon: Plane, target: 100, label: "Destinations", suffix: "+" },
    { icon: Clock, target: 99.5, label: "On Time", suffix: "%" },
    { icon: Shield, target: 100, label: "Secure", suffix: "%" }
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let step = 0;
    const steps = 60;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 4);

      setCounts({
        deliveries: Math.floor(stats[0].target * ease),
        routes: Math.floor(stats[1].target * ease),
        onTime: Math.floor(stats[2].target * ease),
        secure: Math.floor(stats[3].target * ease)
      });

      if (step >= steps) clearInterval(timer);
    }, 30);

  }, [isVisible]);

  const getValue = (i: number) =>
    [counts.deliveries, counts.routes, counts.onTime, counts.secure][i];

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-primary to-primary-dark text-white"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <span className="bg-white/10 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border border-white/20">
            Our Achievements
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Key Statistics
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mt-3">
            Numbers that reflect our commitment to excellence and reliability
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const value = getValue(i);

            return (
              <div
                key={i}
                className="text-center group hover:scale-105 transition duration-300"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 border border-white/20">

                  {/* Icon */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="bg-white/20 p-3 sm:p-4 rounded-full">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="mb-2">
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                      {value.toLocaleString()}
                    </span>
                    <span className="text-base sm:text-lg ml-1 text-secondary">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <p className="text-xs sm:text-sm lg:text-base text-white/80 font-medium">
                    {stat.label}
                  </p>

                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom Text */}
        <div className="text-center mt-10 sm:mt-14 lg:mt-16">
          <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-3xl mx-auto">
            These numbers represent years of dedication and our commitment to
            world-class logistics solutions.
          </p>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;