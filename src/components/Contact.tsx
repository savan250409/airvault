import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us Anytime",
      details: ["+91 83209 88001", "+91 98790 97000"],
      color: "text-primary"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@airvlt.com, pratik@airvlt.com"],
      color: "text-secondary"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:30 - 19:30", "Sunday: CLOSED"],
      color: "text-secondary"
    }
  ];

  const services = [
    "Air Freight",
    "Sea Freight",
    "Land Transport",
    "Express Delivery",
    "Warehousing",
    "Custom Clearance"
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-subtle">
      <div className="container-custom">

        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to streamline your logistics? Contact our experts today for personalized solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN */}
          {/* LEFT COLUMN */}
          <div className="lg:col-span-1 space-y-8">

            <div className="space-y-6">

              {/* 1️⃣ HEAD OFFICE */}
              <Card className="p-6 card-hover animate-slide-left" style={{ animationDelay: "0.0s" }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-subtle text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Head Office</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      130, Mezzanine Floor, Integrated Cargo Terminal,<br />
                      S.V. Patel International Airport,<br />
                      Ahmedabad (Gujarat) 380003
                    </p>
                  </div>
                </div>
              </Card>

              {/* 2️⃣ REGISTERED OFFICE */}
              <Card className="p-6 card-hover animate-slide-left" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-subtle text-secondary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Registered Office</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      B/3, Shefali Complex,<br />
                      Paldi Cross Road,<br />
                      Ahmedabad (Gujarat) 380007
                    </p>

                  </div>
                </div>
              </Card>

              {/* 3️⃣ CALL US ANYTIME */}
              <Card className="p-6 card-hover animate-slide-left" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-subtle text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Call Us Anytime</h3>
                    <p className="text-muted-foreground">+91 83209 88001</p>
                    <p className="text-muted-foreground">+91 98790 97000</p>
                  </div>
                </div>
              </Card>

              {/* 4️⃣ EMAIL US */}
              <Card className="p-6 card-hover animate-slide-left" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-subtle text-secondary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p className="text-muted-foreground">info@airvlt.com</p>
                    <p className="text-muted-foreground">pratik@airvlt.com</p>

                  </div>
                </div>
              </Card>

              {/* 5️⃣ BUSINESS HOURS */}
              <Card className="p-6 card-hover animate-slide-left" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-subtle text-secondary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Business Hours</h3>
                    <p className="text-muted-foreground">Mon - Sat: 9:30 AM - 7:30 PM</p>
                    <p className="text-muted-foreground">Sunday: CLOSED</p>
                  </div>
                </div>
              </Card>

            </div>

            {/* Quick Services (KEEP SAME) */}
            <Card className="p-6 animate-slide-left" style={{ animationDelay: "0.6s" }}>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Our Services</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 py-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>


          {/* RIGHT SIDE – remains unchanged */}
          <div className="lg:col-span-2 space-y-8">

            {/* BRANCH RAJKOT */}
            {/* BRANCH RAJKOT */}
            <Card className="p-6 animate-slide-right">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-bold text-gradient-primary">RAJKOT BRANCH</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <p className="font-semibold">AIRVAULT EXPRESS & LOGISTICS PVT. LTD.</p>
                <p className="text-sm text-muted-foreground">
                  Office Address: 20, Sardar Nagar Main Road, Near sarveshwar chowk, Rajkot - 360001 (Gujarat-India)
                </p>
                <p className="text-sm"><strong>Contact Number:</strong> +91 83209 88001 | +91 90339 29470</p>
                <p className="text-sm"><strong>Email:</strong> info@airvlt.com</p>
              </CardContent>
            </Card>

            {/* BRANCH AHMEDABAD */}
            <Card className="p-6 animate-slide-right" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-bold text-gradient-primary">AHMEDABAD BRANCH</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <p className="font-semibold">AIRVAULT EXPRESS & LOGISTICS PVT. LTD.</p>
                <p className="text-sm text-muted-foreground">
                  Office Address: B/3, Shefali Complex, Paldi Cross Road, Ahmedabad - 380007 (Gujarat-India)
                </p>
                <p className="text-sm"><strong>Contact Number:</strong> +91 98790 97000 | +91 76004 30306</p>
                <p className="text-sm"><strong>Email:</strong> pratik@airvlt.com</p>
              </CardContent>
            </Card>

            {/* BRANCH VADODARA */}
            <Card className="p-6 animate-slide-right" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-bold text-gradient-primary">VADODARA BRANCH</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <p className="font-semibold">AIRVAULT EXPRESS & LOGISTICS PVT. LTD.</p>
                <p className="text-sm text-muted-foreground">
                  Office Address: GF-13, Indiabulls Mega Mall, Nr. Jetalpur Bridge, Vadodara - 390007 (Gujarat-India)
                </p>
                <p className="text-sm"><strong>Contact Number:</strong> +91 75730 12301 | +91 85115 30306</p>
                <p className="text-sm"><strong>Email:</strong> bharat@airvlt.com</p>
              </CardContent>
            </Card>

            {/* BRANCH INDORE */}
            <Card className="p-6 animate-slide-right" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-bold text-gradient-primary">INDORE BRANCH</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-2">
                <p className="font-semibold">AIRVAULT EXPRESS & LOGISTICS PVT. LTD.</p>
                <p className="text-sm text-muted-foreground">
                  Office Address: No. 8, B-299 Commercial Part 1, New Lohamandi, Dewas Naka, Indore - 452010 (Madhya Pradesh-India)
                </p>
                <p className="text-sm"><strong>Contact Number:</strong> +91 90395 19252</p>
                <p className="text-sm"><strong>Email:</strong> dinesh.singh@airvlt.com</p>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
