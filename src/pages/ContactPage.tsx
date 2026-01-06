import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-20 w-80 h-80 bg-primary/4 rounded-full blur-3xl animate-pulse" style={{animationDuration: "7s"}}></div>
        <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-secondary/4 rounded-full blur-3xl animate-pulse" style={{animationDuration: "9s", animationDelay: "1.5s"}}></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;