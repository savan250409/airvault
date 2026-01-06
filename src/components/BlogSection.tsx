import { Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const navigate = useNavigate();
  
  const latestPosts = [
    {
      id: "1",
       slug: "future-of-global-supply-chain-2024",
      title: "The Future of Logistics: AI and Automation",
      excerpt: "Exploring how artificial intelligence and automation are revolutionizing the logistics industry and improving delivery efficiency.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1586953983027-d7508a64f4bb?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    },
    {
      id: "2",
      slug: "optimizing-last-mile-delivery",
      title: "Sustainable Shipping: Green Logistics Solutions",
      excerpt: "How eco-friendly practices in logistics are reducing carbon footprint while maintaining efficiency and cost-effectiveness.",
      author: "Michael Chen",
      date: "March 12, 2024", 
      category: "Sustainability",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    },
    {
      id: "3",
      slug: "sustainable-logistics-green-transportations",
      title: "Global Trade Trends: What to Expect in 2024",
      excerpt: "Analysis of emerging global trade patterns and their impact on international shipping and logistics operations.",
      author: "Emma Rodriguez",
      date: "March 10, 2024",
      category: "Industry Insights",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=entropy&cs=tinysrgb"
    }
  ];

  const scrollToBlog = () => {
    const blogElement = document.getElementById('blog');
    if (blogElement) {
      blogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className=" py-4 section-padding bg-gradient-subtle">
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

        {/* Blog Grid - Latest 3 Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestPosts.map((post, index) => (
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group-hover:text-primary"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center animate-slide-up">
          <Button 
            variant="gradient-primary" 
            size="lg"
            asChild
          >
            <Link to="/blog">
              View More Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;