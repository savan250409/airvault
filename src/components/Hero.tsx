import { useState, useEffect } from "react";
import { ArrowRight, Truck, Ship, Plane, Shield, Search, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import heroImage from "@/assets/hero-logistics.jpg";
import airFreight from "@/assets/air-freight.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";
import airTransport from "@/assets/air-transport.jpg";

const backgroundImages = [
  heroImage,
  airFreight,
  seaTransport,
  landTransport,
  airTransport
];

const Hero = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState("");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Plane, value: "100+", label: "Destinations" },
    { icon: Truck, value: "31k+", label: "Deliveries" },
    { icon: Clock, value: "99.5%", label: "On Time" },
    { icon: Shield, value: "100%", label: "Secure" },
  ];

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setIsLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const response = await fetch(
        `https://admin.airvlt.com/api/tracking_api/get_tracking_data?api_company_id=7&customer_code=superadmin&tracking_no=${trackingNumber}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setTrackingData(data[0]);
        setIsOpen(true);
      } else {
        setError("No data found for this tracking number");
      }
    } catch (err) {
      setError("Failed to fetch tracking details. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to safely get the dynamic list (array of arrays or objects)
  const getDynamicList = (data: any) => {
    // Based on user provided format, there seems to be a list of key-value pairs.
    // We look for an array property that contains arrays of strings.
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key].length > 0 && Array.isArray(data[key][0])) {
        return data[key];
      }
    }
    // Fallback: check for 'item_data' if it matches
    if (data.item_data && Array.isArray(data.item_data)) return data.item_data;
    return null;
  };

  // Helper to get history/events
  const getHistory = (data: any) => {
    // Look for array of objects with 'event_at' or 'event_description'
    for (const key in data) {
      if (Array.isArray(data[key]) && data[key].length > 0 && typeof data[key][0] === 'object' && !Array.isArray(data[key][0]) && data[key][0].event_at) {
        return data[key];
      }
    }
    return null;
  };

  const dynamicList = trackingData ? getDynamicList(trackingData) : [];
  const history = trackingData ? getHistory(trackingData) : [];

  return (
 <section className="relative min-h-screen flex items-center overflow-hidden">

  {/* Background */}
  <div className="absolute inset-0 z-0">
    {backgroundImages.map((img, i) => (
      <img
        key={i}
        src={img}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          i === currentBgIndex ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}

    {/* LIGHT WHITE OVERLAY (IMPORTANT) */}
    <div className="absolute inset-0 bg-white/85"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 py-16">
    <div className="max-w-6xl">

      {/* Badge */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold border border-orange-200">
          🚀 Leading Logistics Solutions
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
        <span className="text-blue-600">Safe & Reliable</span>
        <br />
        <span className="text-gray-800">Logistic Solutions</span>
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mb-10">
        Experience world-class logistics services with our comprehensive transport
        solutions. From land to sea to air, we deliver your cargo safely and on time,
        every time.
      </p>

      {/* Tracking */}
      {/* <div className="flex flex-col sm:flex-row gap-3 max-w-md mb-10">
        <Input
          placeholder="Enter Tracking Number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <Button onClick={handleTrack} disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Track"}
        </Button>
      </div> */}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">

        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white shadow-md p-4 rounded-xl border border-gray-100"
          >
            <div className="p-2 bg-blue-50 rounded-full">
              <stat.icon className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <p className="text-gray-900 font-bold text-lg">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}

      </div>

    </div>
  </div>

</section>
  );
};

export default Hero;
