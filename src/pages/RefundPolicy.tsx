import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, ShieldCheck, FileText, Coins, Ban, HelpCircle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen relative bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-20 w-80 h-80 bg-primary/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "7s" }}></div>
        <div className="absolute bottom-1/4 right-20 w-96 h-96 bg-secondary/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "9s", animationDelay: "1.5s" }}></div>
      </div>

      <div className="relative z-10">
        <Header />

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Refund Policy</h1>
            <p className="text-sm sm:text-base text-primary-foreground/80 max-w-2xl mx-auto">
              Please review the conditions under which refunds are applicable for shipments handled by Airvault.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="space-y-8">

            {/* Eligibility for Refund */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <ShieldCheck className="w-6 h-6 text-secondary" />
                Eligibility for Refund
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Refunds are applicable only in case of loss or damage to the shipment. No refunds for delayed
                deliveries or shipments held due to customs or regulatory issues.
              </p>
            </div>

            {/* Refund Process */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <FileText className="w-6 h-6 text-secondary" />
                Refund Process
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                Submit refund requests within <span className="font-semibold text-foreground">30 days</span> of shipment date. Provide:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Proof of shipment (AWB, invoice)
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Proof of delivery (if applicable)
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Proof of loss/damage (survey report, photos)
                </li>
              </ul>
            </div>

            {/* Refund Amount */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <Coins className="w-6 h-6 text-secondary" />
                Refund Amount
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Maximum refund: Declared value or 100 USD, whichever is lower.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Excludes courier charges, duties, taxes, and other fees.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  No refund for unclaimed shipments due to recipient's inability to receive.
                </li>
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <Ban className="w-6 h-6 text-secondary" />
                Exclusions
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Delayed shipments due to weather, operational issues, or regulatory holds.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Shipments prohibited by law or restricted by our policies.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Courier charges, duties, and taxes are non-refundable.
                </li>
              </ul>
            </div>

            {/* How to Claim Refund */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <HelpCircle className="w-6 h-6 text-secondary" />
                How to Claim Refund
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                Contact customer service with:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Shipment details (AWB, date, contents)
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Supporting documents
                </li>
              </ul>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We'll process refunds within <span className="font-semibold text-foreground">7-10 working days</span>.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/10 p-4">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-sm sm:text-base text-foreground">
                  Contact Email:{" "}
                  <a href="mailto:care@airvlt.com" className="font-semibold text-primary hover:underline">
                    care@airvlt.com
                  </a>
                </span>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default RefundPolicy;
