import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Logistics: AI and Automation",
      excerpt: "Exploring how artificial intelligence and automation are revolutionizing the logistics industry and improving delivery efficiency.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1586953983027-d7508a64f4bb?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    },
    {
      title: "Sustainable Shipping: Green Logistics Solutions",
      excerpt: "How eco-friendly practices in logistics are reducing carbon footprint while maintaining efficiency and cost-effectiveness.",
      author: "Michael Chen",
      date: "March 12, 2024", 
      category: "Sustainability",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    },
    {
      title: "Global Trade Trends: What to Expect in 2024",
      excerpt: "Analysis of emerging global trade patterns and their impact on international shipping and logistics operations.",
      author: "Emma Rodriguez",
      date: "March 10, 2024",
      category: "Industry Insights",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    },
    {
      title: "Supply Chain Optimization Strategies",
      excerpt: "Best practices for optimizing your supply chain to reduce costs, improve efficiency, and enhance customer satisfaction.",
      author: "David Kumar",
      date: "March 8, 2024",
      category: "Operations",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    },
    {
      title: "Digital Transformation in Freight Management",
      excerpt: "How digital technologies are transforming freight management processes and creating new opportunities for growth.",
      author: "Lisa Park",
      date: "March 5, 2024",
      category: "Digital",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    },
    {
      title: "Last-Mile Delivery Innovation",
      excerpt: "Innovative solutions for last-mile delivery challenges, including drone delivery, autonomous vehicles, and smart routing.",
      author: "Alex Thompson",
      date: "March 3, 2024",
      category: "Innovation",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    }
  ];

  const categories = ["All", "Technology", "Sustainability", "Industry Insights", "Operations", "Digital", "Innovation"];

  return (
    <section id="blog" className="section-padding bg-gradient-subtle">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <div className="inline-block">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/20">
              Latest Insights
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary">
            Our Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, insights, and innovations in 
            the logistics and transportation industry.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-slide-up">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "gradient-primary" : "outline-animated"}
              size="sm"
            >
              <Tag className="w-4 h-4 mr-2" />
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="card-hover group overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
                <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <Card className="p-8 bg-gradient-primary text-primary-foreground text-center animate-slide-up">
          <h3 className="text-3xl font-bold mb-4">Stay Informed</h3>
          <p className="text-xl mb-6 opacity-90">
            Subscribe to our newsletter for the latest logistics insights and industry updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <Button variant="gradient-secondary" className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Blog;