import { useState, useEffect } from "react";
import { ArrowRight, Truck, Ship, Plane, Shield, Search, Loader2, Clock, Headphones, ShieldCheck } from "lucide-react";
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
import { getDeliveries, formatDeliveries } from "@/lib/deliveries";
import PayGlocalButton from "@/components/PayGlocalButton";

const backgroundImages = [
heroImage,
airFreight,
seaTransport,
landTransport,
airTransport
];

// Fields to hide from the tracking details popup.
// Matches both top-level keys (e.g. "tracking_no") and docket_info
// labels (e.g. "AWB No.") after normalizing case/punctuation.
const HIDDEN_FIELDS = new Set([
"errors",
"tracking no",
"awb no",
"consignee name",
"receiver name",
"consignee company",
"shipper company",
"customer name",
"customer code",
"customer company name",
"shipper name",
]);

const normalizeLabel = (label: any) =>
String(label).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const isHiddenField = (label: any) => HIDDEN_FIELDS.has(normalizeLabel(label));

const Hero = () => {
const [trackingNumber, setTrackingNumber] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [trackingData, setTrackingData] = useState<any>(null);
    const [currentBgIndex, setCurrentBgIndex] = useState(0);
    const [deliveries, setDeliveries] = useState(getDeliveries());

    // Background slideshow
    useEffect(() => {
    const interval = setInterval(() => {
    setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 2000);
    return () => clearInterval(interval);
    }, []);

    // Recompute the counter every hour so it climbs while the page stays open
    useEffect(() => {
    const hourly = setInterval(() => {
    setDeliveries(getDeliveries());
    }, 1000 * 60 * 60);
    return () => clearInterval(hourly);
    }, []);

    const stats = [
    { icon: Plane, value: "100+", label: "Destinations" },
    { icon: Truck, value: formatDeliveries(deliveries) + "+", label: "Deliveries" },
    { icon: Clock, value: "99%", label: "On Time" },
    { icon: Shield, value: "100%", label: "Secure" },
    { icon: Headphones, value: "24/7", label: "Customer Support" },
    ];

    const handleTrack = async () => {
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setTrackingData(null);

    try {
    const response = await fetch(
    `https://admin.airvlt.com/api/tracking_api/get_tracking_data?api_company_id=7&customer_code=superadmin&tracking_no=${trackingNumber}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
    setTrackingData(data[0]);
    setIsOpen(true);
    }
    } catch {
    // silent
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
    if (Array.isArray(data[key]) && data[key].length > 0 && typeof data[key][0] === 'object' &&
    !Array.isArray(data[key][0]) && data[key][0].event_at) {
    return data[key];
    }
    }
    return null;
    };

    const dynamicList = trackingData ? getDynamicList(trackingData) : [];
    const history = trackingData ? getHistory(trackingData) : [];

    return (
    <>
        <section className="relative min-h-screen flex items-center overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                {backgroundImages.map((img, i) => (
                <img key={i} src={img} className={`absolute inset-0 w-full h-full object-cover transition-opacity
                    duration-1000 ${ i===currentBgIndex ? "opacity-100" : "opacity-0" }`} />
                ))}

                {/* LIGHT WHITE OVERLAY (IMPORTANT) */}
                <div className="absolute inset-0 bg-white/85"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 py-16">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                    <div className="flex-1 max-w-3xl">

                        {/* Badge */}
                        <div className="mb-6">
                            <span
                                className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold border border-orange-200">
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
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mb-10">
                            <Input placeholder="Enter Tracking Number" value={trackingNumber} onChange={(e)=>
                            setTrackingNumber(e.target.value)}
                            />
                            <Button onClick={handleTrack} disabled={isLoading}>
                                {isLoading ?
                                <Loader2 className="animate-spin" /> : "Track"}
                            </Button>
                        </div>


                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">

                            {stats.map((stat, i) => (
                            <div key={i}
                                className="flex items-center gap-3 bg-white shadow-md p-4 rounded-xl border border-gray-100">
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

                    {/* Secure Payment card */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div
                            className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 text-center flex flex-col items-center justify-center min-h-[340px]">
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                                <ShieldCheck className="w-8 h-8 text-blue-600" />
                            </div>

                            <p className="text-gray-700 text-base">Dear Customer,</p>
                            <p className="font-bold text-lg sm:text-xl text-blue-600 my-3 leading-snug">
                                Secure Payment for Your Shipment
                            </p>
                            <p className="text-sm text-gray-600 mb-6">
                                Please click the button below to make your payment safely.
                            </p>

                            {/* PayGlocal one-click payment button (renders "PAY NOW" + opens payment popup) */}
                            <PayGlocalButton className="w-full" />

                            <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                                <Shield className="w-3.5 h-3.5" /> 100% Secure Payment Gateway
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </section>

        {/* Tracking Result Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Tracking Details</DialogTitle>
                </DialogHeader>

                {trackingData && (
                <div className="space-y-4">
                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {Object.entries(trackingData)
                        .filter(([, v]) => !Array.isArray(v) && v !== null && v !== "")
                        .filter(([key]) => !isHiddenField(key))
                        .map(([key, value]) => {
                        const str = String(value);
                        const isUrl = /^https?:\/\//i.test(str);
                        return (
                        <div key={key} className={`flex gap-2 ${isUrl ? "col-span-2 min-w-0" : "" }`}>
                            <span
                                className="font-semibold text-gray-600 capitalize whitespace-nowrap">{key.replace(/_/g,
                                " ")}:</span>
                            {isUrl ? (
                            <a href={str} target="_blank" rel="noopener noreferrer" title={str}
                                className="text-blue-600 underline whitespace-nowrap overflow-x-auto">
                                {str}
                            </a>
                            ) : (
                            <span className="text-gray-800">{str}</span>
                            )}
                        </div>
                        );
                        })}
                    </div>

                    {/* Item List */}
                    {dynamicList && dynamicList.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Item Details</h3>
                        <Table>
                            <TableBody>
                                {dynamicList
                                .filter((row: any[]) => !isHiddenField(row[0]))
                                .filter((row: any[]) => row[1] !== null && String(row[1]).trim() !== "")
                                .map((row: any[], i: number) => (
                                <TableRow key={i}>
                                    {row.map((cell: any, j: number) => (
                                    <TableCell key={j}>{cell}</TableCell>
                                    ))}
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    )}

                    {/* History */}
                    {history && history.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Tracking History</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date / Time</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Location</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.map((event: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell className="whitespace-nowrap">{event.event_at}</TableCell>
                                    <TableCell>{event.event_description}</TableCell>
                                    <TableCell>{event.location || "-"}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    )}
                </div>
                )}
            </DialogContent>
        </Dialog>
    </>
    );
    };

    export default Hero;
