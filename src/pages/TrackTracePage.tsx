import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, MapPin, Calendar, Clock, User, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TrackTracePage = () => {
  const [awbNumber, setAwbNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = () => {
    if (!awbNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        awb: awbNumber,
        status: "CANCELLED",
        bookingDate: "26/7/2022",
        consigneeName: "Mr. MARK CLEARY",
        destination: "AUSTRALIA",
        pieces: "1",
        deliveryDate: "",
        deliveryTime: "",
        receiverName: "",
        forwardingNo: "",
        activities: [
          {
            date: "18/9/2023",
            time: "06:57",
            location: "AHMEDABAD",
            activity: "SHIPMENT HAS BEEN CANCELLED",
            remarks: ""
          },
          {
            date: "26/7/2022",
            time: "13:15",
            location: "RAJKOT",
            activity: "SHIPMENT DATA RECEIVED",
            remarks: ""
          }
        ]
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="section-padding">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block">
              <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold border border-secondary/20">
                Track & Trace
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary">
              Track Your Shipment
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your AWB number to get real-time updates on your shipment status
            </p>
          </div>

          {/* Track Input Section */}
          <Card className="max-w-2xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="text-center text-primary flex items-center justify-center gap-2">
                <Package className="w-6 h-6" />
                Enter AWB Number
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter your AWB number"
                  value={awbNumber}
                  onChange={(e) => setAwbNumber(e.target.value)}
                  className="flex-1 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                />
                <Button 
                  onClick={handleTrack}
                  disabled={!awbNumber.trim() || isLoading}
                  variant="gradient-primary"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  {!isLoading && "Track"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Please enter your 11-digit AWB number to track your shipment
              </p>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-8 animate-slide-up">
              {/* Status Overview */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    AWB: {trackingData.awb}
                  </CardTitle>
                  <div className="text-2xl font-bold text-destructive">
                    Status: {trackingData.status}
                  </div>
                </CardHeader>
              </Card>

              {/* Tracking Information Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Tracking Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left text-sm font-semibold">AWB No.</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Booking Date</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Consignee Name</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Destination</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">No. of Pieces</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Status</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Delivery Date</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Delivery Time</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Receiver Name</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Forwarding No.</th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">View POD</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 text-sm">{trackingData.awb}</td>
                          <td className="border border-border p-3 text-sm">{trackingData.bookingDate}</td>
                          <td className="border border-border p-3 text-sm">{trackingData.consigneeName}</td>
                          <td className="border border-border p-3 text-sm">{trackingData.destination}</td>
                          <td className="border border-border p-3 text-sm">{trackingData.pieces}</td>
                          <td className="border border-border p-3 text-sm">
                            <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-semibold">
                              {trackingData.status}
                            </span>
                          </td>
                          <td className="border border-border p-3 text-sm">{trackingData.deliveryDate || "-"}</td>
                          <td className="border border-border p-3 text-sm">{trackingData.deliveryTime || "-"}</td>
                          <td className="border border-border p-3 text-sm">{trackingData.receiverName || "-"}</td>
                          <td className="border border-border p-3 text-sm">{trackingData.forwardingNo || "-"}</td>
                          <td className="border border-border p-3 text-sm">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left text-sm font-semibold flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date
                          </th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Time
                            </div>
                          </th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              Location
                            </div>
                          </th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              Activity
                            </div>
                          </th>
                          <th className="border border-border p-3 text-left text-sm font-semibold">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trackingData.activities.map((activity, index) => (
                          <tr key={index} className="hover:bg-muted/50 transition-colors">
                            <td className="border border-border p-3 text-sm font-medium">{activity.date}</td>
                            <td className="border border-border p-3 text-sm">{activity.time}</td>
                            <td className="border border-border p-3 text-sm font-medium text-primary">{activity.location}</td>
                            <td className="border border-border p-3 text-sm">{activity.activity}</td>
                            <td className="border border-border p-3 text-sm">{activity.remarks || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="bg-gradient-subtle">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Need Help?</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        If you have any questions about your shipment status or need assistance, 
                        please contact our customer service team.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline-animated" size="sm">
                          Contact Support
                        </Button>
                        <Button variant="outline" size="sm">
                          Download Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* No Results State */}
          {!trackingData && awbNumber && (
            <Card className="max-w-md mx-auto text-center">
              <CardContent className="p-8">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Enter AWB Number</h3>
                <p className="text-muted-foreground text-sm">
                  Please enter your AWB number above and click track to view shipment details.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackTracePage;