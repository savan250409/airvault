import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Facebook, Twitter, Linkedin, MessageCircle, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import airTransport from "@/assets/air-transport.jpg";
import seaTransport from "@/assets/sea-transport.jpg";
import landTransport from "@/assets/land-transport.jpg";

const BlogDetailPage = () => {
  const { slug  } = useParams();
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: "1",
      slug: "future-of-global-supply-chain-2024",
      title: "The Future of Global Supply Chain: Technology Trends Shaping 2024",
      excerpt: "Explore how AI, IoT, and blockchain are revolutionizing logistics operations and creating new opportunities for efficiency and transparency in global trade.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Technology",
      image: airTransport,
      tags: ["AI", "Blockchain", "IoT", "Supply Chain"],
      content: `
        <h2>Introduction</h2>
        <p>The global supply chain industry is experiencing a technological revolution that's transforming how goods move around the world. From artificial intelligence to blockchain, these innovations are creating unprecedented opportunities for efficiency, transparency, and reliability.</p>
        
        <h2>Artificial Intelligence in Logistics</h2>
        <p>AI is fundamentally changing logistics operations. Machine learning algorithms now predict demand patterns with remarkable accuracy, enabling companies to optimize inventory levels and reduce waste. Route optimization powered by AI considers countless variables in real-time, from traffic patterns to weather conditions, ensuring the fastest and most efficient deliveries.</p>
        
        <p>Predictive maintenance is another game-changer. AI systems analyze sensor data from vehicles and equipment to predict failures before they occur, dramatically reducing downtime and maintenance costs. This proactive approach saves companies millions while improving service reliability.</p>
        
        <h2>Internet of Things (IoT) Revolution</h2>
        <p>IoT sensors are creating a connected supply chain where every shipment can be tracked in real-time. Temperature-sensitive goods are monitored continuously, ensuring pharmaceutical products and perishables maintain quality throughout transit. Smart containers communicate their location, condition, and contents, providing complete visibility across the supply chain.</p>
        
        <p>This level of connectivity enables immediate response to issues. If a refrigerated container's temperature rises, alerts are sent instantly, allowing teams to take corrective action before products are compromised.</p>
        
        <h2>Blockchain for Transparency</h2>
        <p>Blockchain technology is solving one of logistics' oldest challenges: lack of transparency. Every transaction and movement is recorded in an immutable ledger, creating a single source of truth accessible to all authorized parties. This eliminates disputes, reduces paperwork, and builds trust between partners.</p>
        
        <p>Smart contracts automate payments and documentation, reducing processing time from days to minutes. Customs clearance becomes faster and more reliable, as all required documentation is verified and readily available on the blockchain.</p>
        
        <h2>The Road Ahead</h2>
        <p>These technologies aren't just incremental improvements – they're transforming the fundamental nature of global logistics. Companies that embrace these innovations gain competitive advantages in efficiency, reliability, and customer satisfaction. The future of supply chain is digital, connected, and intelligent.</p>
      `
    },
    {
      id: "2",
      slug: "optimizing-last-mile-delivery",
      title: "Sustainable Logistics: Green Transportation Solutions",
      excerpt: "How companies are reducing their carbon footprint through eco-friendly transportation and logistics practices.",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Sustainability",
      image: seaTransport,
      tags: ["Sustainability", "Green Logistics", "Environment"],
      content: `
        <h2>The Imperative for Green Logistics</h2>
        <p>Climate change has made sustainable logistics not just an ethical choice, but a business imperative. Companies worldwide are reimagining their transportation strategies to reduce environmental impact while maintaining efficiency and profitability.</p>
        
        <h2>Electric and Alternative Fuel Vehicles</h2>
        <p>The transition to electric vehicles (EVs) is accelerating in logistics. Major carriers are investing billions in electric truck fleets, reducing emissions and operating costs. Battery technology improvements now enable long-haul electric trucks, once thought impossible.</p>
        
        <p>Alternative fuels like hydrogen and biofuels offer solutions for heavy-duty applications where batteries aren't yet practical. These technologies promise zero or near-zero emissions while maintaining the power needed for large-scale logistics operations.</p>
        
        <h2>Route Optimization and Load Efficiency</h2>
        <p>Smart routing reduces unnecessary miles, cutting both emissions and costs. AI algorithms find the most efficient paths, considering real-time traffic, delivery windows, and vehicle capacity. Consolidating shipments maximizes load efficiency, meaning fewer trips and lower emissions per package delivered.</p>
        
        <h2>Sustainable Packaging Solutions</h2>
        <p>Innovative packaging materials reduce waste and environmental impact. Biodegradable materials, reusable containers, and optimized package sizes all contribute to sustainability goals while protecting products during transit.</p>
        
        <h2>Building a Sustainable Future</h2>
        <p>Green logistics isn't just about compliance or public relations – it's about building resilient, efficient operations for the future. Companies that invest in sustainability today are positioning themselves for long-term success in an increasingly environmentally conscious world.</p>
      `
    },
    {
      id: "3",
      slug: "sustainable-logistics-green-transportations",
      title: "Optimizing Last-Mile Delivery in Urban Areas",
      excerpt: "Strategies and technologies for improving efficiency and reducing costs in urban last-mile delivery operations.",
      author: "Emma Rodriguez",
      date: "March 10, 2024",
      readTime: "5 min read",
      category: "Operations",
      image: landTransport,
      tags: ["Last Mile", "Urban Logistics", "Efficiency"],
      content: `
        <h2>The Last-Mile Challenge</h2>
        <p>Last-mile delivery represents the most expensive and complex part of the shipping process, accounting for up to 53% of total shipping costs. Urban environments compound these challenges with traffic congestion, parking limitations, and diverse delivery requirements.</p>
        
        <h2>Micro-Fulfillment Centers</h2>
        <p>Strategic placement of small fulfillment centers in urban areas dramatically reduces delivery distances. These facilities enable same-day or even same-hour delivery while reducing transportation costs and emissions. The proximity to customers allows for more flexible delivery windows and better response to demand surges.</p>
        
        <h2>Alternative Delivery Modes</h2>
        <p>Innovative delivery methods are transforming urban logistics. Electric cargo bikes navigate congested streets efficiently, delivering packages faster than traditional vans in many scenarios. Autonomous delivery robots handle small packages on sidewalks, reducing labor costs and traffic impact.</p>
        
        <p>Drone delivery is moving from concept to reality in select markets, offering ultra-fast delivery for urgent items. While regulatory challenges remain, the technology is advancing rapidly.</p>
        
        <h2>Smart Locker Systems</h2>
        <p>Automated parcel lockers provide secure, convenient delivery points that reduce failed delivery attempts. Customers retrieve packages at their convenience, while drivers make single drops at high-efficiency locations. This approach reduces costs and improves customer satisfaction.</p>
        
        <h2>Looking Forward</h2>
        <p>The future of urban last-mile delivery lies in combining these approaches strategically. Success requires understanding local market dynamics, customer preferences, and infrastructure limitations. Companies that master urban last-mile delivery gain significant competitive advantages in the growing e-commerce landscape.</p>
      `
    }
  ];

  const blogPost = blogPosts.find(post => post.slug  === slug );

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Button onClick={() => navigate("/blog")}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(post => post.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: "4s"}}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: "6s", animationDelay: "1s"}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{animationDuration: "8s", animationDelay: "2s"}}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section - Split Layout */}
        <section className="relative pb-10 md:pb-0 overflow-hidden bg-gradient-subtle">
          <div className="container-custom px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <div className="space-y-6 animate-fade-in">
                <Button 
                  variant="outline"
                  className="mb-4"
                  onClick={() => navigate("/blog")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
                
                <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1">
                  {blogPost.category}
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  {blogPost.title}
                </h1>
                
                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4">
                  <Avatar className="w-14 h-14 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
                      {blogPost.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{blogPost.author}</p>
                    <p className="text-muted-foreground text-sm">Author</p>
                  </div>
                </div>
                
                {/* Meta Info */}
                <div className="flex items-center gap-6 text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{blogPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{blogPost.readTime}</span>
                  </div>
                </div>
              </div>
              
              {/* Right: Featured Image */}
              <div className="relative animate-scale-in">
                <div className="relative rounded-2xl overflow-hidden shadow-large aspect-[4/3]">
                  <img 
                    src={blogPost.image} 
                    alt={blogPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container-custom px-6">
            <div className="grid lg:grid-cols-[1fr_320px] gap-12 max-w-7xl mx-auto">
              {/* Main Article */}
              <article className="animate-fade-in">
                {/* Content */}
                <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft border border-border/50">
                  <div 
                    className="prose prose-lg max-w-none blog-content"
                    dangerouslySetInnerHTML={{ __html: blogPost.content }}
                  />
                  
                  {/* Supporting Images */}
                  <div className="grid md:grid-cols-2 gap-6 my-12">
                    <div className="relative rounded-xl overflow-hidden shadow-medium aspect-[4/3]">
                      <img src={seaTransport} alt="Logistics illustration" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden shadow-medium aspect-[4/3]">
                      <img src={landTransport} alt="Supply chain" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                
                {/* Tags Section */}
                <div className="mt-8 bg-card rounded-2xl p-8 shadow-soft border border-border/50">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Tagged In
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blogPost.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      >
                        <Tag className="w-3 h-3 mr-2" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Share Section */}
                <div className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Share this article</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="flex-1 min-w-[140px]">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[140px]">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[140px]">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" className="flex-1 min-w-[140px]">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
                
                {/* Author Bio */}
                {/* <div className="mt-8 bg-card rounded-2xl p-8 shadow-soft border border-border/50">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <Avatar className="w-20 h-20 border-4 border-primary/20 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                        {blogPost.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 text-foreground">{blogPost.author}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Senior Logistics Expert & Industry Analyst
                      </p>
                      <p className="text-foreground/80 leading-relaxed mb-4">
                        With over 15 years of experience in global logistics and supply chain management, 
                        {blogPost.author.split(' ')[0]} specializes in emerging technologies and sustainable 
                        transportation solutions. A thought leader in the industry.
                      </p>
                      <Button variant="outline" size="sm">View All Posts</Button>
                    </div>
                  </div>
                </div> */}
                
                {/* Comment Section */}
                {/* <div className="mt-8 bg-card rounded-2xl p-8 shadow-soft border border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-foreground">Discussion</h3>
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <Separator className="mb-6" />
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground/40" />
                    <p className="text-muted-foreground mb-6">
                      Be the first to share your thoughts on this article
                    </p>
                    <Button className="btn-gradient-primary">
                      Start Discussion
                    </Button>
                  </div>
                </div> */}
              </article>
              
              {/* Sidebar - Recent Posts */}
              <aside className="space-y-8">
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 sticky top-24">
                  <h3 className="text-xl font-bold mb-6 text-foreground">Recent Posts</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((post) => (
                      <div 
                        key={post.slug}
                        className="group cursor-pointer"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <div className="relative rounded-lg overflow-hidden mb-3 aspect-video">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-6" />
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/blog")}
                  >
                    View All Posts
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/95"></div>
          <div className="container-custom px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated with Industry Insights
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Subscribe to our newsletter and get the latest logistics trends delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button className="bg-secondary hover:bg-secondary-dark text-secondary-foreground px-8 py-3">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
      
      <style>{`
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: hsl(var(--foreground));
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          font-size: 1.0625rem;
          color: hsl(var(--foreground));
        }
        .blog-content p:first-of-type::first-letter {
          font-size: 3.5rem;
          font-weight: 700;
          float: left;
          line-height: 1;
          margin-right: 0.5rem;
          margin-top: 0.1rem;
          color: hsl(var(--primary));
        }
        .blog-content ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.75rem;
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
};

export default BlogDetailPage;
