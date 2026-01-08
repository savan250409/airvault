const CounterSection = () => {
    const stats = [
        {
            value: "50+",
            label: "Global Partners"
        },
        {
            value: "100+",
            label: "Destinations"
        },
        {
            value: "24/7",
            label: "Support"
        },
        {
            value: "99.5%",
            label: "On-time Delivery"
        }
    ];

    return (
        <section className="py-16 bg-background">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300 p-8 text-center group cursor-default hover:-translate-y-1"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="text-slate-500 font-medium text-lg">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CounterSection;
