import { ArrowRight } from "lucide-react";
import aboutTeamImg from "../assets/about-team.jpg";

const AboutSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 animate-fade-in">
          <h4 className="font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 text-primary">
            About AirVault
          </h4>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            World Class{" "}
            <span className="text-primary">Logistics</span> Solutions
          </h2>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 relative animate-slide-right">

            {/* Pattern */}
            <div className="hidden sm:block absolute -left-6 -bottom-6 w-40 h-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] opacity-40 -z-10"></div>

            <div className="relative">

              {/* IMAGE SAME LOOK */}
              <div className="w-full sm:w-[85%] lg:w-[80%] rounded-t-[3rem] rounded-bl-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img
                  src={aboutTeamImg}
                  alt="AirVault Team"
                  className="w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* FLOATING BADGE */}
              <div className="absolute top-1/2 left-2 sm:-left-6 lg:-left-12 transform -translate-y-1/2 z-30 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="bg-primary text-white p-4 sm:p-6 lg:p-8 rounded-tr-[2rem] rounded-bl-[2rem] shadow-xl">
                  <div className="text-xl sm:text-2xl lg:text-4xl font-bold mb-1">
                    31k+
                  </div>
                  <div className="text-xs sm:text-sm leading-tight opacity-90">
                    Products<br />Delivered
                  </div>
                </div>
              </div>

            </div>

            <div className="h-10 sm:h-14 lg:h-0"></div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-full lg:w-1/2 animate-slide-left text-center lg:text-left">

            <div className="space-y-4 sm:space-y-6">

              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                At AirVault, we provide innovative and reliable logistics and transportation services that cater to businesses of all sizes. Our focus is on delivering seamless, cost-effective, and efficient solutions, ensuring your goods reach their destination safely and on time.
              </p>

              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                We are committed to excellence in every aspect of our operations, our services span over a wide range of sectors, making us the trusted choice for companies looking to optimize their supply chain and improve overall efficiency.
              </p>

              {/* BUTTON */}
              <div className="pt-2 sm:pt-4">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 bg-primary text-white px-5 sm:px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  Read More
                  <span className="bg-white/20 p-1 rounded-full">
                    <ArrowRight className="w-4 h-4" />
                  </span>
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