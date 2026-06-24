import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Scale, Box, Calculator, Plus, Trash2, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Volumetric divisor (cm³ per kg). Dimensions entered in cm; inches converted in.
const DIVISOR = 5000;
const IN_TO_CM = 2.54;

interface BoxRow {
  id: number;
  unit: "cm" | "in";
  length: string;
  breadth: string;
  height: string;
  weight: string;
}

const emptyBox = (id: number): BoxRow => ({
  id,
  unit: "cm",
  length: "",
  breadth: "",
  height: "",
  weight: "",
});

const num = (v: string) => {
  const n = parseFloat(v);
  return isNaN(n) || n < 0 ? 0 : n;
};

// Per-box computed weights, all in kg.
const computeBox = (b: BoxRow) => {
  const f = b.unit === "in" ? IN_TO_CM : 1;
  const dead = num(b.weight);
  const volumetric = (num(b.length) * f * (num(b.breadth) * f) * (num(b.height) * f)) / DIVISOR;
  const chargeable = Math.max(dead, volumetric);
  return { dead, volumetric, chargeable };
};

const WeightCalculator = () => {
  const [boxes, setBoxes] = useState<BoxRow[]>([emptyBox(1)]);

  const update = (id: number, field: keyof BoxRow, value: string) =>
    setBoxes((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));

  const addBox = () =>
    setBoxes((prev) => [...prev, emptyBox(prev.length ? Math.max(...prev.map((b) => b.id)) + 1 : 1)]);

  const removeBox = (id: number) =>
    setBoxes((prev) => (prev.length > 1 ? prev.filter((b) => b.id !== id) : prev));

  const total = useMemo(
    () => boxes.reduce((sum, b) => sum + computeBox(b).chargeable, 0),
    [boxes]
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <div className="section-padding">
        <div className="container-custom max-w-5xl">
          {/* Page heading */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block">
              <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold border border-secondary/20">
                Logistics Tools
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary">Weight Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understand dead weight vs volumetric weight and calculate the chargeable weight of your shipment.
            </p>
          </div>

          {/* Concept cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Dead weight */}
            <Card className="border-t-4 border-t-secondary">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-lg font-bold text-primary">Dead Weight</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dead weight (also called actual weight) is the physical weight of your package as measured on a
                  scale. This includes the weight of the contents plus the packaging materials.
                </p>
                <div className="rounded-lg bg-secondary/5 border border-secondary/15 p-3 text-sm text-gray-700">
                  <strong>Example:</strong> A box containing books weighs 5 kg on a scale = 5 kg dead weight.
                </div>
              </CardContent>
            </Card>

            {/* Volumetric weight */}
            <Card className="border-t-4 border-t-primary">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Box className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-primary">Volumetric Weight</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Volumetric weight (also called dimensional weight) is calculated from the package dimensions. It
                  represents the space your package occupies relative to its actual weight.
                </p>
                <div className="rounded-lg bg-primary/5 border border-primary/15 p-3 text-sm text-gray-700">
                  <strong>Formula:</strong> Length × Breadth × Height ÷ {DIVISOR}
                  <span className="block text-xs text-muted-foreground mt-1">(All dimensions in centimetres)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How chargeable weight is determined */}
          <Card className="mb-14">
            <CardContent className="p-6">
              <h2 className="text-center text-lg font-bold text-primary mb-6">
                How Chargeable Weight is Determined
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-secondary/5 border border-secondary/15 p-5 text-center">
                  <Scale className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Dead Weight</p>
                  <p className="text-2xl font-bold text-secondary mt-1">3 kg</p>
                </div>
                <div className="rounded-xl bg-secondary/5 border border-secondary/15 p-5 text-center">
                  <Box className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Volumetric Weight</p>
                  <p className="text-xs text-muted-foreground mt-1">40×30×20 ÷ {DIVISOR}</p>
                  <p className="text-2xl font-bold text-secondary mt-1">4.8 kg</p>
                </div>
                <div className="rounded-xl bg-green-50 border border-green-200 p-5 text-center">
                  <Calculator className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Chargeable Weight</p>
                  <p className="text-xs text-muted-foreground mt-1">Maximum of both</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">4.8 kg</p>
                </div>
              </div>
              <div className="mt-5 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
                <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800">
                  <strong>Important:</strong> Shipping carriers always charge based on the higher weight between
                  dead weight and volumetric weight. This ensures fair pricing for both heavy and bulky items.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Calculator tool */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Weight Calculator Tool</h2>
            <p className="text-primary/70 mt-1">Calculate the chargeable weight for your international shipment</p>
          </div>

          <div className="space-y-5">
            {boxes.map((b, i) => {
              const { dead, volumetric, chargeable } = computeBox(b);
              return (
                <Card key={b.id} className="bg-gray-50/60">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800">Box {i + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeBox(b.id)}
                        disabled={boxes.length === 1}
                        className="flex items-center justify-center w-8 h-8 rounded-md border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Remove box"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Measurement unit */}
                    <div className="mb-4 max-w-xs">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Measurement Unit</label>
                      <select
                        value={b.unit}
                        onChange={(e) => update(b.id, "unit", e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                      >
                        <option value="cm">Centimeters (cm)</option>
                        <option value="in">Inches (in)</option>
                      </select>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Length ({b.unit})</label>
                        <Input
                          type="number"
                          min={0}
                          value={b.length}
                          onChange={(e) => update(b.id, "length", e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Breadth ({b.unit})</label>
                        <Input
                          type="number"
                          min={0}
                          value={b.breadth}
                          onChange={(e) => update(b.id, "breadth", e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Height ({b.unit})</label>
                        <Input
                          type="number"
                          min={0}
                          value={b.height}
                          onChange={(e) => update(b.id, "height", e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Dead Weight (kg)</label>
                        <Input
                          type="number"
                          min={0}
                          value={b.weight}
                          onChange={(e) => update(b.id, "weight", e.target.value)}
                          className="bg-white"
                        />
                      </div>
                    </div>

                    {/* Per-box results */}
                    <div className="grid grid-cols-3 gap-3 mt-5 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Dead Weight</p>
                        <p className="font-bold text-gray-800">{dead.toFixed(2)} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Volumetric Weight</p>
                        <p className="font-bold text-gray-800">{volumetric.toFixed(2)} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Chargeable Weight</p>
                        <p className="font-bold text-secondary">{chargeable.toFixed(2)} kg</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Add box */}
          <div className="flex justify-center my-6">
            <Button type="button" variant="gradient-primary" onClick={addBox} className="gap-2">
              <Plus className="w-4 h-4" /> Add Another Box
            </Button>
          </div>

          {/* Total */}
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-primary-foreground text-center py-8 px-4 shadow-lg">
            <p className="text-lg font-semibold">Total Shipping Weight</p>
            <p className="text-4xl font-bold my-1">{total.toFixed(2)} kg</p>
            <p className="text-sm text-primary-foreground/80">
              This is the weight that will be used for calculating your shipping costs
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WeightCalculator;
