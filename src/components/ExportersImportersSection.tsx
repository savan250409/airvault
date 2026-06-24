import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const ExportersImportersSection = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Exporters */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 text-white p-8 shadow-lg">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-white/5 rounded-full"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-5">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
            <p className="text-4xl font-bold mb-1">700+</p>
            <p className="text-xl font-semibold mb-2">Exporters</p>
            <p className="text-blue-200 text-sm">SMEs Empowered</p>
          </div>
        </div>

        {/* Importers */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-white p-8 shadow-lg">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
              <ArrowDownLeft className="w-6 h-6 text-white" />
            </div>
            <p className="text-4xl font-bold mb-1">300+</p>
            <p className="text-xl font-semibold mb-2">Importers</p>
            <p className="text-orange-100 text-sm">Trusted by Leading Businesses</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExportersImportersSection;
