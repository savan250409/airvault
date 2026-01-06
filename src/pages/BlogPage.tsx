import { useState } from "react";
import { Calendar, User, Clock, ArrowRight, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import airTransport from "@/assets/air-transport.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const postsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

    const blogPosts = [
    {
      id: 1,
      slug: "future-of-global-supply-chain-2024",
      title: "The Future of Global Supply Chain: Technology Trends Shaping 2024",
      excerpt: "Explore how AI, IoT, and blockchain are revolutionizing logistics operations.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Technology",
      image: airTransport,
      tags: ["AI", "Blockchain", "IoT"]
    },
    {
      id: 2,
      slug: "optimizing-last-mile-delivery",
      title: "Optimizing Last-Mile Delivery in Urban Areas",
      excerpt: "Strategies and technologies for improving efficiency in last-mile delivery.",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "5 min read",
      category: "Operations",
      image: landTransport,
      tags: ["Last Mile", "Urban Logistics"]
    },
    {
      id: 3,
      slug: "sustainable-logistics-green-transportation",
      title: "Sustainable Logistics: Green Transportation Solutions",
      excerpt: "Reducing carbon footprint through eco-friendly logistics practices.",
      author: "Emma Rodriguez",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Sustainability",
      image: seaTransport,
      tags: ["Sustainability", "Green Logistics"]
    },
    {
      id: 4,
      slug: "international-trade-regulations-2024",
      title: "International Trade Regulations: 2024 Updates",
      excerpt: "Stay compliant with latest international trade regulations.",
      author: "David Thompson",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Compliance",
      image: airTransport,
      tags: ["Regulations", "Compliance"]
    },
    {
      id: 5,
      slug: "cold-chain-logistics-best-practices",
      title: "Cold Chain Logistics: Best Practices and Technologies",
      excerpt: "Guidelines for maintaining temperature-sensitive cargo.",
      author: "Lisa Park",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Operations",
      image: landTransport,
      tags: ["Cold Chain", "Pharmaceuticals"]
    },
    {
      id: 6,
      slug: "ecommerce-fulfillment-scaling-growth",
      title: "E-commerce Fulfillment: Scaling for Growth",
      excerpt: "Building scalable e-commerce fulfillment operations.",
      author: "James Wilson",
      date: "March 3, 2024",
      readTime: "5 min read",
      category: "E-commerce",
      image: seaTransport,
      tags: ["E-commerce", "Fulfillment"]
    },
    {
      id: 7,
      slug: "risk-management-in-global-logistics",
      title: "Risk Management in Global Logistics",
      excerpt: "Identifying and mitigating risks in international logistics.",
      author: "Rachel Green",
      date: "March 1, 2024",
      readTime: "8 min read",
      category: "Risk Management",
      image: airTransport,
      tags: ["Risk Management", "Security"]
    },
    {
      id: 8,
      slug: "warehouse-automation-efficiency",
      title: "Warehouse Automation: Next-Level Efficiency",
      excerpt: "Implementing robotics and automation in warehouse operations.",
      author: "John Doe",
      date: "Feb 28, 2024",
      readTime: "6 min read",
      category: "Technology",
      image: landTransport,
      tags: ["Automation", "Robotics"]
    },
    {
      id: 9,
      slug: "blockchain-in-logistics-tracking-transparency",
      title: "Blockchain in Logistics: Tracking & Transparency",
      excerpt: "How blockchain ensures transparent supply chains.",
      author: "Anna Smith",
      date: "Feb 25, 2024",
      readTime: "7 min read",
      category: "Technology",
      image: seaTransport,
      tags: ["Blockchain", "Transparency"]
    },
    {
      id: 10,
      slug: "ai-powered-route-optimization",
      title: "AI-Powered Route Optimization",
      excerpt: "Leverage AI to improve delivery routes and reduce fuel consumption.",
      author: "Kevin Brown",
      date: "Feb 22, 2024",
      readTime: "6 min read",
      category: "Technology",
      image: airTransport,
      tags: ["AI", "Route Optimization"]
    },
    {
      id: 11,
      slug: "global-shipping-trends-2024",
      title: "Global Shipping Trends in 2024",
      excerpt: "Insights into global shipping market trends and forecasts.",
      author: "Sophia Lee",
      date: "Feb 20, 2024",
      readTime: "7 min read",
      category: "Operations",
      image: seaTransport,
      tags: ["Shipping", "Global Trade"]
    },
    {
      id: 12,
      slug: "digital-twins-in-supply-chain",
      title: "Digital Twins in Supply Chain Management",
      excerpt: "Using digital twin technology to simulate and optimize logistics operations.",
      author: "Liam Scott",
      date: "Feb 18, 2024",
      readTime: "8 min read",
      category: "Technology",
      image: airTransport,
      tags: ["Digital Twin", "Optimization"]
    }
  ];

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const currentPosts = blogPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{animationDuration: "6s"}}></div>
        <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-secondary/3 rounded-full blur-3xl animate-pulse" style={{animationDuration: "8s", animationDelay: "1.5s"}}></div>
      </div>
      
      <div className="relative z-10">
        <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Logistics <span className="text-secondary">Insights</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Stay informed with the latest trends, insights, and best practices in logistics and supply chain management.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <div className="container-custom py-20">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
          <Link to={`/blog/${post.slug}`} key={post.id} className="group">
              <Card className="hover:shadow-large transition-all duration-300 hover:-translate-y-1 animate-fade-in">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/60"></div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-3">
                  <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center text-xs text-muted-foreground space-x-3">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>

          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10 items-center">
          <Button size="sm" variant="outline-animated" onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "gradient-primary" : "outline-animated"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button size="sm" variant="outline-animated" onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
      
      <Footer />
      </div>
    </div>
  );
};

export default BlogPage;
