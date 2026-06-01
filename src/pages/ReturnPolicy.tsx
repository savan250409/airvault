import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, CheckCircle, RefreshCw, Truck, Clock, Coins, PackageX } from "lucide-react";

const ReturnPolicy = () => {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Return Policy</h1>
            <p className="text-sm sm:text-base text-primary-foreground/80 max-w-2xl mx-auto">
              Understand how returns are handled, the costs involved, and the timeline for returned shipments.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="space-y-8">

            {/* Return Eligibility */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <CheckCircle className="w-6 h-6 text-secondary" />
                Return Eligibility
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                Shipments can be returned if:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Recipient refuses delivery.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Address is incorrect, incomplete, or outdated.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Shipment is undeliverable due to regulatory issues.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Shipment is damaged or contents are missing.
                </li>
              </ul>
            </div>

            {/* Return Process */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <RefreshCw className="w-6 h-6 text-secondary" />
                Return Process
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  We'll notify the sender via email or phone.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Sender must provide return instructions within 2 working days.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  If no instructions, shipment will be returned to origin.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Return shipment tracking will be provided.
                </li>
              </ul>
            </div>

            {/* Return Shipping Costs */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <Truck className="w-6 h-6 text-secondary" />
                Return Shipping Costs
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Return shipping costs apply, billed to sender.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Additional charges may apply for:
                </li>
              </ul>
              <ul className="mt-2 space-y-2 text-sm sm:text-base text-muted-foreground pl-6">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary/60 rounded-full mt-2"></span>
                  Storage fees (if shipment is held at destination).
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary/60 rounded-full mt-2"></span>
                  Customs clearance or duties on return.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary/60 rounded-full mt-2"></span>
                  Handling fees for special cargo.
                </li>
              </ul>
            </div>

            {/* Return Timeline */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <Clock className="w-6 h-6 text-secondary" />
                Return Timeline
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Returns typically processed within 7-10 working days post return initiation.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Complex cases (customs holds, disputes) may take longer.
                </li>
              </ul>
            </div>

            {/* Refund or Credit */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <Coins className="w-6 h-6 text-secondary" />
                Refund or Credit
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Refunds/credits handled as per our Refund Policy.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  No refund for courier charges on returned shipments.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  2 way shipping charges will be applicable in case of RTO.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Duties/taxes paid aren't refundable if shipment is returned.
                </li>
              </ul>
            </div>

            {/* Unclaimed Shipments */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <PackageX className="w-6 h-6 text-secondary" />
                Unclaimed Shipments
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  After multiple delivery attempts, shipments may be returned.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Sender responsible for return costs and charges.
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                <Mail className="w-6 h-6 text-secondary" />
                Contact Us
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                For return requests or queries, contact customer service{" "}
                <a href="mailto:csdesk@airvlt.com" className="font-semibold text-primary hover:underline">
                  csdesk@airvlt.com
                </a>{" "}
                with:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Shipment AWB
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Reason for return
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                  Return instructions
                </li>
              </ul>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default ReturnPolicy;
