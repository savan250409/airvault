import { Calendar, MapPin, Users, Clock, ExternalLink, Award, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import airTransport from "@/assets/air-transport.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";

const EventsPage = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Global Logistics Summit 2024",
      description: "Join industry leaders discussing the future of global supply chains and emerging technologies.",
      date: "April 15-17, 2024",
      location: "Dubai, UAE",
      type: "Conference",
      attendees: "2000+",
      image: airTransport,
      status: "upcoming",
      highlights: ["Keynote Speaker", "Panel Discussion", "Networking"],
      website: "https://globallogistics2024.com"
    },
    {
      id: 2,
      title: "Maritime Transport Expo",
      description: "Showcasing innovations in sea freight and port management technologies.",
      date: "May 20-22, 2024",
      location: "Singapore",
      type: "Exhibition",
      attendees: "5000+",
      image: seaTransport,
      status: "upcoming",
      highlights: ["Product Demo", "Live Presentations", "Industry Awards"],
      website: "https://maritimeexpo.sg"
    },
    {
      id: 3,
      title: "Supply Chain Innovation Workshop",
      description: "Hands-on workshop covering AI and IoT implementations in modern logistics.",
      date: "June 8-9, 2024",
      location: "Mumbai, India",
      type: "Workshop",
      attendees: "200+",
      image: landTransport,
      status: "upcoming",
      highlights: ["Hands-on Training", "Expert Mentoring", "Certificate Program"],
      website: "https://supplychainworkshop.in"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "International Trade & Logistics Fair 2024",
      description: "Participated as exhibitor showcasing our comprehensive logistics solutions and digital platforms.",
      date: "February 10-12, 2024",
      location: "Frankfurt, Germany",
      type: "Exhibition",
      attendees: "15000+",
      image: airTransport,
      status: "attended",
      achievements: ["Best Innovation Award", "500+ New Contacts", "3 Partnership Deals"],
      highlights: ["Award Winner", "Partnership Deals", "Media Coverage"]
    },
    {
      id: 5,
      title: "Asia Pacific Logistics Conference",
      description: "Delivered keynote presentation on 'Digital Transformation in Logistics Operations'.",
      date: "January 25-26, 2024",
      location: "Bangkok, Thailand",
      type: "Conference",
      attendees: "3000+",
      image: seaTransport,
      status: "presented",
      achievements: ["Keynote Speaker", "Panel Moderator", "Industry Recognition"],
      highlights: ["Keynote Speaker", "Thought Leadership", "Media Interviews"]
    },
    {
      id: 6,
      title: "Cold Chain Logistics Symposium",
      description: "Participated in panel discussion on pharmaceutical logistics and temperature management.",
      date: "December 8-9, 2023",
      location: "London, UK",
      type: "Symposium",
      attendees: "800+",
      image: landTransport,
      status: "panelist",
      achievements: ["Panel Expert", "Case Study Presentation", "Technical Showcase"],
      highlights: ["Panel Expert", "Case Study", "Technical Demo"]
    },
    {
      id: 7,
      title: "Green Logistics & Sustainability Expo",
      description: "Showcased our sustainable transportation solutions and carbon reduction initiatives.",
      date: "November 15-17, 2023",
      location: "Amsterdam, Netherlands",
      type: "Exhibition",
      attendees: "2500+",
      image: seaTransport,
      status: "exhibited",
      achievements: ["Sustainability Champion", "Green Innovation Showcase", "EU Partnership"],
      highlights: ["Sustainability Focus", "Green Innovation", "EU Recognition"]
    }
  ];

  const eventStats = [
    { label: "Events Attended", value: "25+", icon: Calendar },
    { label: "Countries Visited", value: "15", icon: MapPin },
    { label: "Industry Connections", value: "5000+", icon: Users },
    { label: "Awards Received", value: "8", icon: Award }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-primary text-primary-foreground';
      case 'attended': return 'bg-success text-success-foreground';
      case 'presented': return 'bg-secondary text-secondary-foreground';
      case 'panelist': return 'bg-accent text-accent-foreground';
      case 'exhibited': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Industry <span className="text-secondary">Events</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Connecting with industry leaders, sharing insights, and staying at the forefront of logistics innovation through global events.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {eventStats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 rounded-lg bg-card border border-border/50 hover:shadow-medium transition-all duration-300 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <stat.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-20">
        <div className="container-custom">
          <Tabs defaultValue="upcoming" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Join Us at Upcoming Events</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Meet our team at these upcoming industry events where we'll be sharing insights and showcasing our latest solutions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <Card 
                    key={event.id}
                    className="group hover:shadow-large transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-primary/70"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className={getStatusColor(event.status)}>
                          {event.type}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {event.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2 text-secondary" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2 text-secondary" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="w-4 h-4 mr-2 text-secondary" />
                          {event.attendees} Expected
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">Event Highlights:</h4>
                        <div className="flex flex-wrap gap-1">
                          {event.highlights.map((highlight) => (
                            <Badge key={highlight} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        variant="gradient-primary" 
                        className="w-full"
                        asChild
                      >
                        <a href={event.website} target="_blank" rel="noopener noreferrer">
                          Learn More
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Event Journey</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover how we've been actively participating in industry events, sharing knowledge, and building valuable connections.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {pastEvents.map((event, index) => (
                  <Card 
                    key={event.id}
                    className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-primary/70"></div>
                      <div className="absolute top-4 left-4 right-4 flex justify-between">
                        <Badge className={getStatusColor(event.status)}>
                          {event.type}
                        </Badge>
                        {event.status === 'attended' && (
                          <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                            <Award className="w-3 h-3 mr-1" />
                            Award Winner
                          </Badge>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                        <p className="text-sm text-white/80">{event.date} • {event.location}</p>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground text-sm">{event.description}</p>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 text-secondary" />
                        {event.attendees} Attendees
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">Our Achievements:</h4>
                        <ul className="space-y-1">
                          {event.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <TrendingUp className="w-3 h-3 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {event.highlights.map((highlight) => (
                          <Badge key={highlight} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in">
            Meet Us at the <span className="text-gradient-primary">Next Event</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
            Want to connect at an upcoming event? Schedule a meeting with our team and discover how we can transform your logistics operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: "0.4s"}}>
            <Button size="lg" variant="gradient-primary">
              Schedule Meeting
            </Button>
            <Button size="lg" variant="outline-animated">
              View Event Calendar
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;