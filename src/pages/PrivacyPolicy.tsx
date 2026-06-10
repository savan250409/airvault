import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-sm sm:text-base text-primary-foreground/80 max-w-2xl mx-auto">
              Airvault Express and Logistics Private Limited — how we collect, use, and protect your personal data.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="space-y-8">

            {/* Intro */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                We understand that you value how your information is used and shared, and we appreciate your trust in us to handle it responsibly. This Privacy Policy describes how Airvault Express and Logistics Private Limited (collectively "Airvault, we, our, us") collect, use, share or otherwise process your personal data through Airvault website{" "}
                <a href="https://www.airvlt.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.airvlt.com</a>,
                {" "}and / or its mobile application (hereinafter referred to as the "Website") and process your personal information through Website, services, products, features, and applications that reference this Privacy Policy (together "Services").
              </p>
              <p>
                By visiting and accessing this Website, providing your information or availing our Services, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Website's Terms and Conditions and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy, as may be amended from time to time by us at our discretion. If you do not agree to the Website's Terms and Conditions or the terms of this Privacy Policy, please refrain from accessing the Website or using our Services. You are responsible to read and understand this Privacy Policy carefully before using the Website or using our Services.
              </p>
            </div>

            {/* Understand the Collection */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">UNDERSTAND THE COLLECTION OF YOUR INFORMATION</h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  We collect your personal data relating to your identity, demographics and when you use our Website, Services or otherwise interact with us during the course of our relationship and related information provided from time to time. Some of the information that we may collect includes but is not limited to Information provided to us during booking your shipment and/or customer onboarding or using our Website, such as full name, address, contact number, email ID, occupation and any such information shared as proof of identity or address. The personal data may be collected from the brands basis on the type of the services rendered by you. We only collect the information that is required for legitimate, business, contractual and lawful purposes only. Once you give us your personal data, you are not anonymous to us. You always have the option to not provide the information by choosing not to use a particular Services on the Website. Some of the categories of information we process about you are the following:
                </p>
                <ul className="space-y-2 pl-2">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
                    personal data such as name, address, email ID, and contact number, date of birth, and know your customer details (as may be applicable);
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
                    Pickup or drop location information for delivery of the shipment.
                  </li>
                </ul>
                <p>
                  The purpose of collecting your personal data is to provide you and our customers, vendors, and business partners, with a safe, efficient, smooth, and customised experience. Suppose you choose to post messages on our chat rooms or other message areas, or other social media handles maintained by us. In that case, we will collect and retain this information you provide to us and use it for the purpose as defined in this Privacy Policy. We have onboarded certain third parties that provide services on our behalf. These third parties may collect information from you from time to time. When such third-party service providers collect your personal data directly from you, you will be governed by their privacy policies. We shall not be responsible for the third-party service provider's privacy practices or the content of their privacy policies, and we request you read their privacy policies prior to disclosing any information.
                </p>
                <p>
                  We may also have references to websites related to our group companies and certain third-party websites. When you click to such references, you may be redirected to their website / platform, and it will be governed by their Privacy Policies. Airvault clarifies that it shall not take any responsibility for the personal data being collected by any external party or their privacy practices or the content of their privacy policies, and we request you to read their privacy policies before disclosing any information to them.
                </p>
              </div>
            </div>

            {/* Use of Your Information */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">USE OF YOUR INFORMATION</h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  We use your personal data to provide the Services you request. To the extent we use your personal data to market to you or send communications such as updates inline to our program, we will provide you the ability to opt-out of such uses. We use your personal data to generate leads or identify business opportunities, deliver shipment(s), contact you for last mile delivery, enhancing customer experience, resolve disputes, troubleshoot problems, send verification emails to ensure your identity, help promote a safe service, measure consumer interest in our Services, gather feedbacks, inform you about offers, products, services, and updates; customise and enhance your experience; conduct surveys for internal purposes; detect and protect us against error, fraud and other criminal activity, enforce our terms and conditions, exercising a right or obligation conferred or imposed by law, including responding to request and legal demands, or as otherwise described to you at the time of collection of information.
                </p>
                <p>
                  We may use your personal data to post blogs, testimonials, success stories obtained from you on Website or during a survey or to enhance your experience on the Website and provide you access to the Services being offered by us. We may use the information that you may have shared with us or our third-party service providers for such posts. By sharing these posts to us or to any of our third-party service providers you provide us with appropriate consent to post them in our portals as required.
                </p>
                <p>
                  In our efforts to continually improve our service offerings, we collect and analyse demographic data about our users' activity on Website. We identify and use your IP address to help diagnose problems with our server, and to administer Website. Your Internet Protocol ("IP") address is also used to help identify you and to gather broad demographic information.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">COOKIES AND OTHER IDENTIFIERS</h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  We use data collection devices such as "cookies" on certain pages of the Website to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. "Cookies" are small files placed on your hard drive that assist us in providing our services. Cookies do not contain any of your personal data. We offer certain features that are only available through the use of a "cookie". Cookies can also help us provide information that is targeted to your interests. You are always free to decline/delete our cookies if your browser permits, although in that case you may not be able to use certain features on the Website. Additionally, you may encounter "cookies" or other similar devices on certain pages of the Website that are placed by third parties. We do not control the use of cookies by third parties. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics helps us understand how our customers, business partners, and vendors use the site. You can read more about how Google uses your personal data here:{" "}
                  <a href="https://www.google.com/intl/en/policies/privacy/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.google.com/intl/en/policies/privacy/</a>.
                  {" "}You can also opt-out of Google Analytics here:{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
                  {" "}You can also control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit your use of certain features or functions on the Services. The types of information we gather shall always be governed by the terms of this Privacy Policy. For more information, please visit the Cookie Policy.
                </p>
              </div>
            </div>

            {/* Sharing */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">UNDERSTAND ABOUT SHARING OF PERSONAL DATA</h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  We may share personal data that is directly related to your business relationship with Airvault, with other members of our corporate family of companies affiliates, business partners, vendors, related companies and with other third parties, our other corporate entities for purposes of providing Services offered by them such as delivering shipments, identifying a business opportunity, analysing gaps in our offerings or for other legitimate interests. These entities, partners may further share such information with their affiliates/ group companies, business partners and other third parties for the purpose of providing you their products and services and may market to you as a result of such sharing unless you explicitly opt-out.
                </p>
                <p>
                  We may disclose personal data if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal processes or proceedings. We may disclose personal data to law enforcement agencies, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to protect the safety, property, or rights of Airvault, our customers/vendors/business partners, our employees or other person, or to: enforce our Website's Terms and Conditions or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.
                </p>
                <p>
                  When sharing your personal data for processing, we implement appropriate security measures to safeguard it. Additionally, where applicable, we establish agreements with third parties, ensuring they process your data solely for specified purposes while maintaining confidentiality and adhering to strict security standards.
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">SECURITY AND SAFETY PRECAUTIONS</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We implement appropriate physical, electronic, and procedural safeguards to protect your information. When you access your account, we provide a secure server for added protection. Once your information is in our possession, we follow strict security guidelines to prevent unauthorised access. However, by using the Website, you acknowledge the inherent risks of transmitting data over the internet and the World Wide Web ("WWW"), which cannot always be completely secure. As a result, some risks will always exist which is beyond our control. Users are responsible for safeguarding their login credentials and password records for their accounts.
              </p>
            </div>

            {/* Opt-Out */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">CHOICE/OPT-OUT</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We provide all users of our Website with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications. If you do not wish to receive promotional communications from us then you can opt out by clicking on the 'Unsubscribe' button available in the communication or writing to us at the contact details provided below.
              </p>
            </div>

            {/* Advertisements */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">ADVERTISEMENTS ON WEBSITE</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We may, at our sole discretion, use third-party advertising companies to serve advertisements when you visit our Website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you. In case you end up landing on third-party website, you shall be governed by the terms of use and privacy policies of their website or portals.
              </p>
            </div>

            {/* Children */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">CHILDREN INFORMATION</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Use of our Website is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. We do not knowingly solicit or collect personal data from children under the age of 18 years. If you are under the age of 18 years, you may use our Website and its Services only with the involvement of a parent or guardian guidance.
              </p>
            </div>

            {/* Data Retention */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">DATA RETENTION</h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  We retain your personal data in accordance with applicable laws, for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse, investigate, to enable Airvault to exercise its legal rights and/or defend against legal claims or if required by law or for other legitimate purposes. We may continue to retain your data in anonymised form for analytical and research purposes.
                </p>
                <p>Below is the data retention timeline:</p>
                <p>
                  <strong className="text-foreground">For our client customers:</strong> We retain personal data processed on behalf of our clients in line with the terms of the contract with the client. As a data processor, we are committed to ensuring that personal data is retained only for as long as necessary to fulfil the purposes for which it was collected or as required by the terms of the contract with the client, in compliance with applicable laws and regulations. The duration of the data retention is determined by the client, in accordance with their data retention policies, legal obligations and business requirements.
                </p>
                <p>
                  <strong className="text-foreground">For our Airvault Retail customers:</strong> In line with our data minimisation and privacy principles, we will retain as long as required to fulfil the purpose for which it was collected and a reasonable period thereafter to comply with the audit, accounting, contractual, technical and legal requirements for security purpose and/or resolve any disputes, claims as per our records retention policy as per the applicable laws.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">YOUR RIGHTS</h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p>
                  We at Airvault take every reasonable step to ensure that your personal data that we process is accurate and, where necessary, kept up to date, and any of your personal data that we process that you inform us is inaccurate (having regard to the purposes for which they are processed) is erased or rectified.
                </p>
                <p>
                  <strong className="text-foreground">For our Airvault Retail customers:</strong> You may reach out to us to correct and update your personal data, including deleting any certain non-mandatory information provided by you while taking the service from us. Kindly write to us at contact information provided below to assist you with these requests.
                </p>
                <p>
                  You have an option to withdraw your consent that you have already provided by writing to us at the contact information provided below. Please mention "for withdrawal of consent" in your subject line of your communication. We will verify such requests before acting on your request. Please note, however, that withdrawal of consent will not be retroactive and will be in accordance with the terms of this Privacy Policy, related Website's terms and conditions and applicable laws. In the event you withdraw consent given to us under this Privacy Policy, such withdrawal may hinder your access to the Website or restrict provision of our Services for which we consider that information to be necessary.
                </p>
                <p>
                  You have a right to nominate a person who shall act on your behalf in the event of your incapacity. Such nomination must be made in accordance with the applicable laws and guidelines. Please write to us on the below contact details in order to process your request in this regard. Upon receiving valid documentation supporting the nomination, we will recognise the nominated individual and allow them to exercise rights related to your personal data, including requests for access, correction, deletion, or grievance redressal.
                </p>
                <p>
                  You have the right to raise any grievances or concerns regarding your information with our designated Officer, as mentioned below. For complaints or processes related to data privacy regulations in India, we recommend referring to the Digital Personal Data Protection Act, 2023 for further details.
                </p>
                <p>
                  <strong className="text-foreground">For our client customers:</strong> Airvault values your trust and is dedicated to protecting your privacy and ensuring that your personal data is handled securely and responsibly. As a data processor, Airvault processes your personal data on behalf of our clients who act as the data fiduciary. In this capacity we adhere to the instructions provided by our clients and the applicable data protection laws, the exercise and management of these rights shall be carried out by the client (Data Fiduciary), as the collector/owner of your personal data. We will ensure that your requests are processed in accordance with the applicable laws in India such as the Digital Personal Data Protection Act 2023. If you have any questions or concerns regarding your data privacy rights, please do not hesitate to contact our Officer, as mentioned below.
                </p>
                <p>
                  <strong className="text-foreground">For our delivery partners or delivery associates:</strong> Airvault respects the privacy of all of its delivery partners / delivery associates. As a data principal, you have the right to request access to the personal data we have about you, including information about how your data is used and processed. You can contact below mentioned Officer to request the deletion of your personal data, the withdrawal of consent, or any other applicable rights. As a delivery partner employed by a third-party vendor, may process your personal data; however, the exercise and management of your rights will be through your employer. Airvault will work with your employer to ensure that your rights are protected and upheld in accordance with applicable laws.
                </p>
              </div>
            </div>

            {/* Your Consent */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">YOUR CONSENT</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                By accessing our Website or providing your information, you consent to the collection, use, storage, disclosure, and processing of your information (including sensitive personal data) on the Website in accordance with this Privacy Policy. If you share personal data of any other individual with us, you confirm that you have the necessary authority to do so and to allow us to process that information as outlined in this Privacy Policy. By providing your personal data on the Website or through any partner platforms or establishments, you consent to us—including our corporate entities, technology partners, marketing channels, business partners, and other third parties—contacting you via SMS, instant messaging apps, calls, and/or email for the purposes outlined in this Privacy Policy.
              </p>
            </div>

            {/* Amendments */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">AMENDMENTS TO THIS PRIVACY POLICY</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Please check our Privacy Policy periodically for changes or updates. We may update this Privacy Policy to reflect changes to our information practices. We will alert you to significant changes by posting the date our policy/notice got last updated, placing a notice on our Website, or by sending you an email when we are required to do so by applicable law.
              </p>
            </div>

            {/* Officer */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-primary">OFFICER</h2>
              <div className="space-y-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">Ms. Damini Parmar</strong></p>
                <p>Designation: Head – Customer Experience</p>
                <p>Airvault Express and Logistics Private Limited</p>
                <p>
                  Email:{" "}
                  <a href="mailto:csdesk@airvlt.com" className="text-primary hover:underline font-medium">
                    csdesk@airvlt.com
                  </a>
                </p>
                <p>
                  Contact No:{" "}
                  <a href="tel:+918320988001" className="text-primary hover:underline font-medium">
                    +91 83209 88001
                  </a>
                </p>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
