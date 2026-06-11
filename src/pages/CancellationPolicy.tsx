import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Mail,
    Ban,
    FileText,
    AlertCircle,
    Clock,
    HelpCircle,
} from "lucide-react";

const CancellationPolicy = () => {
    return (
        <div className="min-h-screen relative bg-background">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute top-1/3 left-20 w-80 h-80 bg-primary/4 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: "7s" }}
                ></div>

                <div
                    className="absolute bottom-1/4 right-20 w-96 h-96 bg-secondary/4 rounded-full blur-3xl animate-pulse"
                    style={{
                        animationDuration: "9s",
                        animationDelay: "1.5s",
                    }}
                ></div>
            </div>

            <div className="relative z-10">
                <Header />

                {/* Hero */}
                <section className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Cancellation Policy
                        </h1>

                        <p className="text-sm sm:text-base text-primary-foreground/80 max-w-2xl mx-auto">
                            Please review our cancellation policy to understand the
                            conditions and timelines applicable for shipment cancellations.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
                    <div className="space-y-8">

                        {/* Cancellation Eligibility */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Applicability
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                This policy applies to all shipments booked with Airvault Express and Logistics Pvt. Ltd. for domestic and international logistics services.
                            </p>
                        </div>

                        {/* Cancellation Timeline */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Cancellation Timeframes
                            </h2>

                            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    Before Pickup: If cancelled before the scheduled pickup time, a cancellation fee of ₹500 + GST will be charged.
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    After Pickup, Before Dispatch: If cancelled after pickup but before dispatch, 50% of the total freight charges will be charged as cancellation fees.
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    In Transit: No cancellations allowed once the shipment is in transit.
                                </li>
                            </ul>
                        </div>

                        {/* Cancellation Charges */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">

                                Cancellation Process
                            </h2>
                            <p>Send cancellation requests in writing (Email or WhatsApp) to the dedicated Sales person for customer’s account.
                                Provide order number, booking reference, and reason for cancellation.</p>

                        </div>

                        {/* Non-Cancellable Cases */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Refund Process
                            </h2>

                            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    Refunds will be processed as per our Refund Policy after receiving the cancellation request.
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    Refunds will be made via the original payment method.
                                </li>
                            </ul>
                        </div>

                        {/* How to Request Cancellation */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Exceptions
                            </h2>
                            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground mb-4">
                                <li className="flex gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                    <span className="mt-2 block h-2 w-2 flex-shrink-0 rounded-full bg-secondary"></span>

                                    <span>
                                        Airvault Express and Logistics Pvt. Ltd. reserves the right to
                                        cancel shipments due to unforeseen circumstances (e.g., natural
                                        disasters, government restrictions, Flight unavailability,
                                        Service suspension at destination or origin).
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    In such cases, a full refund or rescheduling will be offered.
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

export default CancellationPolicy;