import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    FileText,
    UserCheck,
    Shield,
    CreditCard,
    Truck,
    AlertTriangle,
    Scale,
    Mail,
} from "lucide-react";

const TermsConditions = () => {
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
                    style={{ animationDuration: "9s", animationDelay: "1.5s" }}
                ></div>
            </div>

            <div className="relative z-10">
                <Header />

                {/* Hero */}
                <section className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Terms & Conditions
                        </h1>

                        <p className="text-sm sm:text-base text-primary-foreground/80 max-w-2xl mx-auto">
                            Please read these terms carefully before using our logistics
                            services. By using our services, you agree to comply with these
                            conditions.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
                    <div className="space-y-8">

                        {/* Acceptance */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Applicability
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                By accessing or using our services, you acknowledge that you
                                have read, understood, and agreed to these Terms &
                                Conditions.
                            </p>
                        </div>

                        {/* User Responsibilities */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Definition
                            </h2>

                            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    <span>
                                        <strong>Airvault</strong> – means Airvault Express and Logistics Private Limited.
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    <span>
                                        <strong>Parties</strong> – mean and includes Sender/Shipper or Receiver/Consignee and/or their successors or authorised assignees/representatives as the case may be.
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    <span>
                                        <strong>Shipment</strong> – means goods entrusted by Parties to Airvault for transportation under Invoice/Goods Forwarding Note and/or this Docket.
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    <span>
                                        <strong>Delivery</strong> – means tender of Shipment to the Parties or intimation about the arrival of Shipment at the destination.
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    <span>
                                        <strong>NCV</strong> – means No Commercial Value as declared by the Shipper.
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    <span>
                                        <strong>Freight</strong> – means basic freight excluding other components such as GST, taxes, cess, and other applicable charges.
                                    </span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"></span>
                                    <span>
                                        <strong>Docket</strong> – Airvault shall issue this Docket as the acknowledgement of the receipt of Shipment for transportation.
                                    </span>
                                </li>

                            </ul>
                        </div>

                        {/* Prohibited Items */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Contract
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                This Docket is a contract between Airvault and the Shipper and the
                                terms and conditions stipulated in this Docket are in addition to
                                the contract, if any, executed between Airvault and Parties.
                                This Docket is{" "}
                                <strong>"NOT NEGOTIABLE"</strong> under the Indian Laws including,
                                but not limited to, the Negotiable Instruments Act, 1881.
                            </p>
                        </div>

                        {/* Payment Terms */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Declaration of Parties
                            </h2>

                            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="mt- text-secondary text-xl leading-none flex-shrink-0">
                                        •
                                    </span>

                                    <span className="flex-1">
                                        The Shipment is booked on "SAID TO CONTAIN BASIS" only and Airvault has no right or obligation to open/inspect any Shipment in order to check the misuse of Airvault services by any unscrupulous people.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt- text-secondary text-xl leading-none flex-shrink-0">
                                        •
                                    </span>

                                    <span className="flex-1">
                                        This Docket is based on the declaration given by the Parties under invoice/goods forwarding note. Airvault will not be held responsible for any incomplete, inaccurate or wrongful details/declaration whatsoever.</span>
                                </li>

                                <li className="flex items-start gap-3">
                                    <span className="mt- text-secondary text-xl leading-none flex-shrink-0">
                                        •
                                    </span>

                                    <span className="flex-1">
                                        The Parties hereby declare that the Shipment covered under this Docket does not include any offensive, contraband, controlled, illegal, hazardous, inflammable or prohibited articles as defined in various statutes and/or International Air Transport Association ("IATA") regulations, amended from time to time. </span>
                                </li>
                            </ul><br></br>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                In the event, Freight mentioned in this Docket is found to be less than the contracted Freight and/or discrepancy in weight/dimensions declared by Parties in this Docket, then Airvault reserves its right to impose/collect differential amount/charges on/from the Parties.
                            </p> </div>

                        {/* Delivery */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Documentation
                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">

                                <li>
                                    At the time of booking, Parties are obligated to provide proper
                                    & complete documentation/s along with accurate details like
                                    name, address, contact number, email-id to Airvault including
                                    but not limited to respective forms, permits, way bills,
                                    invoices, Stock Transfer Note etc., applicable from time to
                                    time as per the statutory requirements. Airvault shall not be
                                    held responsible/liable in case of any deficiency in the
                                    documents and/or loss/damages caused to the Shipment due to
                                    improper/defective packaging.
                                </li>

                                <li>
                                    Parties hereby declare and undertake to make good the loss/es
                                    to Airvault within a period of 48 (Forty-Eight) Hours or as
                                    may be mutually agreed by Parties in writing (emails permitted)
                                    by way of demand draft in case their Shipment causes damage to
                                    the other Shipments, which are loaded in the same vehicle OR in
                                    case of seizure by any Government authority due to improper and
                                    incomplete documentation as a result other Shipment/s also get
                                    delayed resulting in a loss to Airvault.
                                </li>

                            </ul>
                        </div>

                        {/* Liability */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">

                                Assurance of Delivery
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                This Docket contains "Delivery Date" which is subject to the following provisions:
                            </p><br></br>
                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    Date of intimation for delivery of Shipment or first delivery attempt will be considered as deemed Delivery.
                                </li>

                                <li>
                                    Electronic and heavy items, which cannot be scanned, may undergo cooling for 24 (Twenty-Four) hours and hence one day extra will be applicable.
                                </li>

                                <li>
                                    If such date falls on Sunday or any bank holiday, political bandh etc. then the next working day shall be considered as Assured Delivery Date.
                                </li>

                                <li>
                                    Delivery will not be applicable in case of any accident and/or Force Majeure (as moreover defined in point no. 12 below).
                                </li>
                            </ul><br></br>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                This Shipment will be delivered on receipt of Freight payment. In case of Cash on Delivery (COD), Demand Draft on Delivery (DOD), the Shipment would be delivered only on receipt of the COD/DOD amount as specified by the Parties. Airvault shall not be held responsible for any dispute/claim whatsoever between Sender and Receiver.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">
                                Rounding Off to Next Zero

                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                For ease of computation and hassle-free billing, chargeable weight of each docket will be rounded off to next zero - effective 1st June 2025.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-primary mb-4">

                                Statutory Payments
                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    The Parties are solely responsible for all payments/penalties, levied by the Government or any statutory body from time to time, such as Goods and Service Tax (GST), value added tax, etc.
                                </li>

                                <li>
                                    In the event of any Shipment being seized/held up by any statutory authority including but not limited to Commercial Tax/GST, Customs officials, etc., Airvault will not be held responsible for any kind of delay, consequential losses, Freight refund, or any other losses whatsoever in nature. Further, Parties have agreed to make good the losses to Airvault in case of any claims being lodged on Airvault by statutory authorities due to insufficient documents or wrongful declaration by them. The Parties shall resolve and make good the losses lodged/raised by the statutory authorities to Airvault within 48 (Forty-Eight) hours of such claim or as may be mutually agreed by Parties in writing (emails permitted).
                                </li>

                                <li>
                                    In the event the Shipper/Consignee fails to come forward for payment of penalties/claims levied therein on account of the default, discrepancies, or errors by the Shipper/Consignee, Airvault reserves the right to hold the consignment of the Shipper/Consignee at its sole discretion. Airvault shall not be liable for any loss caused due to confiscation of goods by statutory authorities arising from non-compliance or misdeclaration by the Shipper/Consignee. In case of any mismatches/discrepancies in the invoices uploaded by Airvault in its GST returns, the same must be intimated by the Shipper/Consignee by the 5th of the succeeding month. Airvault shall not be responsible for the loss of Input Tax Credit or interest thereon due to delayed intimation.
                                </li>

                                <li>
                                    The Shipper and Consignee shall be solely responsible, jointly and severally, for the payment of any and all statutory payments, penalties, stamp duties, registration charges, and legal fees in connection with the Docket.
                                </li>
                            </ul>
                        </div>


                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Limitation of Liabilities
                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    Unless specifically agreed by Airvault in writing, this Docket is booked under <strong>Shipper's Risk</strong> only. Appropriate insurance policy should be made available to Airvault at the time of booking and details should be mentioned in the Invoice/Goods Forwarding Note.
                                </li>

                                <li>
                                    Under this Docket, the liability of Airvault, whether under contract or tort, for any loss or damages whatsoever, shall be limited to the Freight amount OR <strong>Rs. 5,000/- (Rupees Five Thousand Only)</strong>, whichever is less, and Airvault will issue only an observation note in this respect.
                                </li>

                                <li>
                                    Neither Airvault nor the Parties shall be held responsible for any kind of indirect, consequential, remote, or exemplary losses/damages claims whatsoever.
                                </li>

                                <li>
                                    When the value of the Shipment is declared by the Parties as <strong>NCV (No Commercial Value)</strong>, the liability of Airvault shall be restricted to <strong>Rs. 100/- (Rupees One Hundred Only)</strong> per Docket.
                                </li>

                                <li>
                                    Airvault assumes no responsibility and/or liability in case the material is outwardly intact at the time of Delivery.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Force Majeure
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                Airvault will not be liable for any loss or damage to the Shipment if it is caused due to:
                            </p>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    Acts of God, beyond the control of Airvault, defective packing or by government officials in discharge of their official duties such as Customs/Taxations inspection or nature of the Shipment, defects, characteristics, strikes, riots, political and other disturbances, fire accidents, explosions, extremist acts, looting, robbery, hijacking, bandh, floods, pandemic, etc.
                                </li>

                                <li>
                                    It is hereby agreed by the Parties that, in the event the Shipment is of a special nature, temperature controlled, time or nature sensitive such as ice cream, medicine, vaccine, photo-film, etc., the same shall be brought to the written notice of Airvault along with special written instructions regarding the handling of the same.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Payments
                            </h2>



                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    In the event Parties fail to take delivery of the Shipment due to any
                                    reason whatsoever, Airvault shall raise bill to the Parties towards
                                    the Freight, demurrage and/or other charges in terms of this Docket,
                                    and the Parties shall be liable to pay all such dues within a period
                                    of <strong>48 (Forty-Eight) Hours</strong>, or as may be mutually agreed
                                    by Parties in writing (emails permitted), from the date of booking.  </li>


                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Lien
                            </h2>

                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Airvault shall have a right to <strong>general lien</strong> over all
                                the Shipments of the Parties towards any dues or outstanding amount
                                payable to Airvault under this Docket or otherwise.
                            </p>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Claims Limitation
                            </h2>


                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    No claim shall be entertained by Airvault unless a written claim is
                                    lodged within <strong>30 (Thirty) days</strong> from the date of the
                                    Docket, subject to remarks on the <strong>Proof of Delivery</strong>.  </li>


                            </ul>

                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Unclaimed Goods
                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    If the Shipment is not accepted by the Parties, when tendered for Delivery, for any reason whatsoever, then subject to 15 (Fifteen) days' written notice to Parties, Airvault shall be entitled to dispatch the Shipment to its unclaimed goods department to proceed with sale of Shipment to realise all dues and any excess amount over and above its dues, Airvault shall endeavour to refund to the respective Parties. If the recovered amount falls short of the actual receivables, Airvault, at its sole discretion, may initiate appropriate steps against the Parties and recover the balance receivables together with interest @2% p.m.  </li>


                            </ul>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Demurrage
                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    Save and except as agreed in special contract with Parties, if the Parties fail to take delivery of Shipment within 48 (Forty-Eight) hours or as may be mutually agreed by Parties in writing (emails permitted) from the date of tendering the Shipment for delivery, then Airvault shall be entitled to charge/recover demurrage / warehouse charges @0.1% of the invoice value or Rs. 1 per kg per day (Rs. 400/- minimum), whichever is higher, or such other rates as may be fixed by Airvault from time to time.

                                </li> </ul>
                        </div>


                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Indemnification

                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    The Parties shall indemnify Airvault resulting from breach of the terms and conditions mentioned herein and/or any proceedings, fine, penalties, damages, & loss and damages to the carrying vehicle and to the other goods due to any error, omission, mis-statement of or insufficient or improper packing labelling or addressing of the Shipment or fraud.
                                </li> </ul>
                        </div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Jurisdiction
                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    This Docket shall be governed in accordance with the laws of India. Any legal proceeding/s to be initiated by Parties (Shipper and Consignee) under this Docket shall be subject to the exclusive jurisdiction of Courts of Ahmedabad, Gujarat, India only. </li> </ul>
                        </div>


                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Disclaimer of representations and warranties
                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    Your access to and use of the Services or any Content is at your own risk. You understand and agree that the Services are provided to you on an "AS IS" or "AS AVAILABLE" basis. Airvault makes no warranty or representation and disclaims all responsibility and liability for: (i) the completeness, accuracy, availability, timeliness, security and non-compatibility or reliability of any Content; (ii) any harm to your computer system, loss of data, or other harm due to malware or spamware that results in loss or damage; and (iii) whether the Services will meet your requirements or be available on an uninterrupted, secure, or error-free basis.
                                </li>
                            </ul></div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Data Protection

                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    While visiting and accessing the website, you may exchange information (including any personal data) with Airvault. You agree to comply with all the applicable data protection laws, including but not limited to the Digital Personal Data Protection Act, 2023 and its corresponding rules. By accepting these terms and conditions, you explicitly consent to share such information with Airvault for processing as may be required. You further agree to indemnify Airvault against any claims, losses, or liabilities arising from non-compliance or breach of the above. When sharing such information for processing, Airvault implements appropriate and reasonable security measures to safeguard it. For more information, please visit the Privacy Policy hosted on our website.</li>
                            </ul></div>

                        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                                Subtotal Billing

                            </h2>

                            <ul className="list-disc pl-6 space-y-4 text-sm sm:text-base text-muted-foreground marker:text-secondary">
                                <li>
                                    Fuel charges will be applied on the subtotal amount of the docket. Effective 1st December 2025</li>
                            </ul></div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default TermsConditions;