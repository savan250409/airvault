const WhyChooseUs = () => {
    return (
        <section className="py-16 px-4 md:px-10 bg-white">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                {/* Left Content */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">
                        ✈️Why Choose Airvault for Internship?
                    </h2>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {/* At Airvault, we deliver more than just logistics — we deliver trust, safety,
                        and reliability. With a strong network across land, air, and sea, we ensure
                        your cargo reaches its destination securely and on time. */}
                       At Airvault, we give interns the opportunity to work on real-world projects in international import and export freight forwarding cargo, gaining practical industry experience with a professional team.
                    </p>

                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-[#E5A121] text-xl">✔</span>
                            <p> Hands-on experience with real industry projects</p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-[#E5A121] text-xl">✔</span>
                            <p>Learn from experienced professionals</p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-[#E5A121] text-xl">✔</span>
                            <p>Supportive and growth-focused environment
                            </p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-[#E5A121] text-xl">✔</span>
                            <p>Opportunity to build practical skills  </p>
                        </li>

                        <li className="flex items-start gap-3">
                            <span className="text-[#E5A121] text-xl">✔</span>
                            <p>Chance to start your career with Airvault  </p>
                        </li>
                    </ul>
                </div>

                {/* Right Image */}
                <div className="relative">
                    <img
                        src="/uploads/service/image/internship.jpg" // apni image path yaha change karo
                        alt="Airvault Internship"
                        className="rounded-2xl shadow-lg w-full object-cover"
                    />

                    {/* Decorative box */}
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#E5A121] rounded-xl opacity-20"></div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;